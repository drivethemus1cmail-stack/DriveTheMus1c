import { useEffect, useRef, useState } from "react";

/**
 * The 3D wordmark.
 *
 * Three.js and the model are lazy chunks, loaded only when the canvas nears
 * the viewport. The flat text lockup holds the space until the model is ready
 * and stays permanently if WebGL is unavailable, so the brand is never missing.
 *
 * Lighting note: the materials are metallic PBR, and metal reflects its
 * surroundings. With directional lights alone there is nothing to reflect and
 * it renders almost black — hence the environment map, not just brighter lamps.
 */

const MODEL_URL = `${import.meta.env.BASE_URL}models/drivethemus1c-wordmark.glb`;
const SPIN_SECONDS = 14;

type Props = {
  /** Shown until the model is ready, and permanently if it can't load. */
  fallback: React.ReactNode;
  /** Continuous 360 rotation. Off renders a single static frame. */
  spin?: boolean;
  /** Tone-mapping exposure. Higher is brighter. */
  exposure?: number;
  className?: string;
};

export default function Wordmark3D({
  fallback,
  spin = false,
  exposure = 1.5,
  className = "",
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      try {
        const [THREE, { GLTFLoader }, { MeshoptDecoder }, { RoomEnvironment }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("three/examples/jsm/libs/meshopt_decoder.module.js"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = exposure;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);

        // Gives the metal something to reflect. Without this it reads black.
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
        scene.environment = envRT.texture;

        // A key light over the environment for a crisp specular rake across the
        // letter faces, plus a warm rim to pick out the bevels.
        const key = new THREE.DirectionalLight(0xfff6e8, 2.2);
        key.position.set(-2.5, 3.5, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xe3bb74, 1.4);
        rim.position.set(3.5, 1.5, -4);
        scene.add(rim);

        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.loadAsync(MODEL_URL);
        if (disposed) return;

        const model = gltf.scene;
        // Recentre on its own bounds so rotation happens about the middle of
        // the word, not wherever the exporter left the origin.
        const box = new THREE.Box3().setFromObject(model);
        const centre = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(centre);

        const pivot = new THREE.Group();
        pivot.add(model);
        scene.add(pivot);

        host.appendChild(renderer.domElement);
        Object.assign(renderer.domElement.style, {
          display: "block",
          width: "100%",
          height: "100%",
        });

        // Turning about Y sweeps the width-by-depth diagonal through the frame,
        // so fit against that rather than width alone, or the first and last
        // letters clip mid-rotation.
        const halfW = spin ? Math.hypot(size.x / 2, size.z / 2) : size.x / 2;
        const halfH = size.y / 2;
        // Generous margin: the previous 1.18 was clipping the outer letters, and
        // perspective means the near face is wider than the bounding box implies.
        const PAD = 1.3;

        const frame = () => {
          const w = Math.max(host.clientWidth, 1);
          const h = Math.max(host.clientHeight, 1);
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          const tanV = Math.tan((camera.fov * Math.PI) / 360);
          const distV = halfH / tanV;
          const distH = halfW / (tanV * camera.aspect);
          camera.position.set(0, 0, Math.max(distV, distH) * PAD);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        };

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const animated = spin && !reduced;

        let raf = 0;
        let visible = true;
        const t0 = performance.now();

        const draw = () => {
          if (disposed) return;
          if (animated) {
            const t = (performance.now() - t0) / 1000;
            pivot.rotation.y = ((t / SPIN_SECONDS) % 1) * Math.PI * 2;
          }
          renderer.render(scene, camera);
          if (animated && visible) raf = requestAnimationFrame(draw);
        };

        const redraw = () => {
          frame();
          if (!animated) renderer.render(scene, camera);
        };

        // Wait for layout before framing, or clientWidth can still be 0 and the
        // fit maths lands on the wrong distance.
        requestAnimationFrame(() => {
          if (disposed) return;
          redraw();
          setReady(true);
          if (animated) draw();
        });

        const resizeObs = new ResizeObserver(redraw);
        resizeObs.observe(host);

        // Don't burn frames on something nobody can see.
        const visObs = new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible && animated && !raf) raf = requestAnimationFrame(draw);
          if (!visible && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        });
        visObs.observe(host);

        const onVis = () => {
          if (document.hidden && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          } else if (!document.hidden && visible && animated && !raf) {
            raf = requestAnimationFrame(draw);
          }
        };
        document.addEventListener("visibilitychange", onVis);

        cleanup = () => {
          cancelAnimationFrame(raf);
          resizeObs.disconnect();
          visObs.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          envRT.texture.dispose();
          pmrem.dispose();
          scene.traverse((obj) => {
            const m = obj as { geometry?: { dispose(): void }; material?: unknown };
            m.geometry?.dispose();
            const kill = (x: unknown) => (x as { dispose?: () => void })?.dispose?.();
            if (Array.isArray(m.material)) m.material.forEach(kill);
            else kill(m.material);
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (err) {
        // No WebGL, blocked context, decode failure — keep the text lockup.
        console.warn("[DriveTheMus1c] 3D wordmark unavailable, using text:", err);
      }
    };

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
      // Fail open: some embedded webviews never deliver observer callbacks,
      // and the logo shouldn't be a casualty of that.
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
  }, [spin, exposure]);

  return (
    <div className={`relative ${className}`}>
      <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
      <div
        className={`flex h-full w-full items-center justify-center transition-opacity duration-500 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        {fallback}
      </div>
    </div>
  );
}
