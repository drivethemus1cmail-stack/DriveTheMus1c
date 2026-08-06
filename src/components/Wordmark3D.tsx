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

/**
 * Turn-and-return rather than a full revolution: past 90° the extrusion hides
 * the faces and the word reads back-to-front. Swinging to a limit and easing
 * back shows the depth and the light moving across the metal while the letters
 * stay the right way round the whole time.
 */
const SWAY_DEGREES = 34;
const SWAY_SECONDS = 11;

type Props = {
  /** Shown until the model is ready, and permanently if it can't load. */
  fallback: React.ReactNode;
  /** "sway" turns and returns; "static" renders one frame and stops. */
  motion?: "static" | "sway";
  /** Tone-mapping exposure. Higher is brighter. */
  exposure?: number;
  /**
   * Vertical field of view. Small values flatten perspective, which keeps a
   * wide wordmark readable — the letters at the ends stop splaying outward.
   */
  fov?: number;
  className?: string;
};

export default function Wordmark3D({
  fallback,
  motion = "static",
  exposure = 1.5,
  fov = 14,
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
        const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 200);

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

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const animated = motion === "sway" && !reduced;

        // Solve for the camera distance rather than padding a guess. For a
        // corner at (x,y,z) to sit inside the frustum:
        //   |x| <= (d - z) * tan(fov/2) * aspect   =>   d >= |x|/(tan*aspect) + z
        // Taking the max over all 8 bbox corners across the rotation range
        // yields a distance that cannot clip at any point in the animation.
        const corners: [number, number, number][] = [];
        for (const sx of [-1, 1])
          for (const sy of [-1, 1])
            for (const sz of [-1, 1])
              corners.push([(sx * size.x) / 2, (sy * size.y) / 2, (sz * size.z) / 2]);

        const sweep = animated
          ? [-1, -0.5, 0, 0.5, 1].map((k) => (k * SWAY_DEGREES * Math.PI) / 180)
          : [0];

        const requiredDistance = (aspect: number) => {
          const tanV = Math.tan((camera.fov * Math.PI) / 360);
          let need = 0;
          for (const a of sweep) {
            const ca = Math.cos(a);
            const sa = Math.sin(a);
            for (const [x, y, z] of corners) {
              const xr = x * ca + z * sa;
              const zr = -x * sa + z * ca;
              need = Math.max(
                need,
                Math.abs(xr) / (tanV * aspect) + zr,
                Math.abs(y) / tanV + zr,
              );
            }
          }
          return need;
        };

        const frame = () => {
          const w = Math.max(host.clientWidth, 1);
          const h = Math.max(host.clientHeight, 1);
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          // 4% breathing room so antialiasing at the extremes isn't shaved off
          camera.position.set(0, 0, requiredDistance(camera.aspect) * 1.04);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        };

        let raf = 0;
        let visible = true;
        const t0 = performance.now();

        const draw = () => {
          if (disposed) return;
          if (animated) {
            const t = (performance.now() - t0) / 1000;
            // sine gives a soft hold at each extreme instead of a hard reversal
            const phase = Math.sin((t / SWAY_SECONDS) * Math.PI * 2);
            pivot.rotation.y = (phase * SWAY_DEGREES * Math.PI) / 180;
          }
          renderer.render(scene, camera);
          if (animated && visible) raf = requestAnimationFrame(draw);
        };

        const redraw = () => {
          frame();
          if (!animated) renderer.render(scene, camera);
        };

        // Framing depends on the host's real size, which may not exist yet at
        // this point — and if the camera is fitted against the default 300x150
        // canvas the outer letters end up outside the frustum. ResizeObserver
        // fires immediately on observe with the true size, and again on every
        // change, so it is the reliable trigger. Don't gate this behind
        // requestAnimationFrame: a background tab never delivers one, and the
        // logo would stay unframed with the fallback showing forever.
        const resizeObs = new ResizeObserver(redraw);
        resizeObs.observe(host);

        redraw();
        setReady(true);
        if (animated) draw();

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
  }, [motion, exposure, fov]);

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
