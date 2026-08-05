import { useEffect, useRef, useState } from "react";

/**
 * The 3D wordmark.
 *
 * Three.js and the model are ~500KB together, so nothing loads until the
 * canvas is actually near the viewport, and the flat text wordmark stays on
 * screen until the model is ready. If WebGL is unavailable or the load fails,
 * the text simply stays — the brand is never missing.
 *
 * Motion: the wordmark is 9.3 units wide and 0.48 deep, so a full 360° spin
 * would put it edge-on (invisible) twice per turn and mirrored for half of it.
 * A slow sway shows the extrusion and catches the light while keeping the
 * letters readable the whole time. Flip FULL_SPIN if you'd rather it turn all
 * the way round.
 */
const FULL_SPIN = false;
const SWAY_DEGREES = 22;
const SWAY_SECONDS = 9;
const SPIN_SECONDS = 24;

const MODEL_URL = `${import.meta.env.BASE_URL}models/drivethemus1c-wordmark.glb`;

type Props = {
  /** Shown until the model is ready, and permanently if it can't load. */
  fallback: React.ReactNode;
  className?: string;
};

export default function Wordmark3D({ fallback, className = "" }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      try {
        const [{ ...THREE }, { GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("three/examples/jsm/libs/meshopt_decoder.module.js"),
        ]);
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

        // Studio-ish lighting: one strong key raking across the faces, a cool
        // rim to separate it from the black, and a low fill so the bevels read.
        scene.add(new THREE.AmbientLight(0xffffff, 0.55));
        const key = new THREE.DirectionalLight(0xfff2dc, 2.6);
        key.position.set(-3, 4, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xe3bb74, 1.8);
        rim.position.set(4, 2, -5);
        scene.add(rim);
        const fill = new THREE.DirectionalLight(0xffffff, 0.5);
        fill.position.set(0, -3, 4);
        scene.add(fill);

        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);

        const gltf = await loader.loadAsync(MODEL_URL);
        if (disposed) return;

        const model = gltf.scene;
        // Recentre on its own bounding box so rotation happens about the middle
        // of the word rather than wherever the exporter's origin landed.
        const box = new THREE.Box3().setFromObject(model);
        const centre = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(centre);

        const pivot = new THREE.Group();
        pivot.add(model);
        scene.add(pivot);

        host.appendChild(renderer.domElement);
        renderer.domElement.style.display = "block";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";

        const frame = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          // Pull back far enough that the whole word fits whichever way the
          // container is shaped — width or height, whichever binds first.
          const vFov = (camera.fov * Math.PI) / 180;
          const distV = size.y / 2 / Math.tan(vFov / 2);
          const distH = size.x / 2 / (Math.tan(vFov / 2) * camera.aspect);
          camera.position.set(0, 0, Math.max(distV, distH) * 1.18);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        };
        frame();

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let raf = 0;
        let visible = true;
        const t0 = performance.now();

        const render = () => {
          if (disposed) return;
          const t = (performance.now() - t0) / 1000;
          if (!reduced) {
            pivot.rotation.y = FULL_SPIN
              ? (t / SPIN_SECONDS) * Math.PI * 2
              : Math.sin((t / SWAY_SECONDS) * Math.PI * 2) * (SWAY_DEGREES * Math.PI) / 180;
          }
          renderer.render(scene, camera);
          if (!reduced && visible) raf = requestAnimationFrame(render);
        };

        const resizeObs = new ResizeObserver(() => {
          frame();
          if (reduced || !visible) renderer.render(scene, camera);
        });
        resizeObs.observe(host);

        // Don't burn frames animating something nobody can see.
        const visObs = new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible && !reduced && !raf) raf = requestAnimationFrame(render);
          if (!visible && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        });
        visObs.observe(host);

        const onHidden = () => {
          if (document.hidden && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          } else if (!document.hidden && visible && !reduced && !raf) {
            raf = requestAnimationFrame(render);
          }
        };
        document.addEventListener("visibilitychange", onHidden);

        setReady(true);
        render();

        cleanup = () => {
          cancelAnimationFrame(raf);
          resizeObs.disconnect();
          visObs.disconnect();
          document.removeEventListener("visibilitychange", onHidden);
          scene.traverse((obj) => {
            const mesh = obj as { geometry?: { dispose(): void }; material?: unknown };
            mesh.geometry?.dispose();
            const mat = mesh.material;
            const dispose = (m: unknown) => (m as { dispose?: () => void })?.dispose?.();
            Array.isArray(mat) ? mat.forEach(dispose) : dispose(mat);
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (err) {
        // No WebGL, blocked context, decode failure — keep the text wordmark.
        console.warn("[DriveTheMus1c] 3D wordmark unavailable, using text:", err);
      }
    };

    // Only pay for Three.js once the logo is worth drawing.
    if (typeof IntersectionObserver === "undefined") {
      void start();
    } else {
      let opened = false;
      const open = () => {
        if (opened) return;
        opened = true;
        void start();
      };
      const gate = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            gate.disconnect();
            open();
          }
        },
        { rootMargin: "200px" },
      );
      gate.observe(host);
      // Fail open, like the scroll reveals: some embedded webviews never
      // deliver observer callbacks, and the logo shouldn't be a casualty.
      const failsafe = window.setTimeout(open, 1500);
      cleanup = () => {
        gate.disconnect();
        window.clearTimeout(failsafe);
      };
    }

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
      <div
        className={`flex h-full w-full items-center justify-center transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        {fallback}
      </div>
    </div>
  );
}
