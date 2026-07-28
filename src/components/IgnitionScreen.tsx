import { useCallback, useEffect, useRef, useState } from "react";
import DashboardGlow from "./DashboardGlow";
import { playChime, playCrank, playDetent } from "../audio/engineAudio";
import { useMusic } from "../audio/MusicContext";

const POSITIONS = [
  { key: "LOCK", angle: -75, status: "Turn the key" },
  { key: "ACC", angle: -25, status: "Accessory" },
  { key: "ON", angle: 25, status: "Ignition on" },
  { key: "START", angle: 75, status: "Starting" },
] as const;

const CRANK_MS = 1250;
const HOLD_MS = 2350;
const EXIT_MS = 820;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
}

type Phase = "idle" | "cranking" | "running" | "exiting";

export default function IgnitionScreen({ onComplete }: { onComplete: () => void }) {
  const { start: startMusic } = useMusic();

  const [index, setIndex] = useState(0);
  const [dragAngle, setDragAngle] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  const indexRef = useRef(0);
  const ignitedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pressRef = useRef<{ x: number; y: number; t: number; moved: boolean } | null>(null);

  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // hold the page still behind the overlay, and put focus on the switch
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    svgRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem("dtm-ignition-done", "1");
    } catch {
      /* private mode — just continue */
    }
    onComplete();
  }, [onComplete]);

  const fireIgnition = useCallback(() => {
    if (ignitedRef.current) return;
    ignitedRef.current = true;

    setPhase("cranking");
    playCrank(1.2);

    const push = (fn: () => void, ms: number) => timersRef.current.push(window.setTimeout(fn, ms));

    push(() => {
      // spring back from START to ON, the way a real key does
      indexRef.current = 2;
      setIndex(2);
      setPhase("running");
      startMusic();
    }, CRANK_MS);

    if (reducedMotion) {
      push(finish, CRANK_MS + 700);
    } else {
      push(() => setPhase("exiting"), HOLD_MS);
      push(finish, HOLD_MS + EXIT_MS);
    }
  }, [finish, reducedMotion, startMusic]);

  const goTo = useCallback(
    (next: number) => {
      if (ignitedRef.current) return;
      const clamped = Math.max(0, Math.min(POSITIONS.length - 1, next));
      const prev = indexRef.current;
      if (clamped === prev) return;

      indexRef.current = clamped;
      setIndex(clamped);
      playDetent();

      if (clamped >= 2 && prev < 2) playChime();
      if (clamped === 3) fireIgnition();
    },
    [fireIgnition],
  );

  const angleFromPointer = useCallback((clientX: number, clientY: number) => {
    const el = svgRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    return (Math.atan2(dx, -dy) * 180) / Math.PI;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (ignitedRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pressRef.current = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const press = pressRef.current;
    if (!press || ignitedRef.current) return;

    if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > 6) press.moved = true;
    if (!press.moved) return;

    const raw = angleFromPointer(e.clientX, e.clientY);
    const clamped = Math.max(POSITIONS[0].angle, Math.min(POSITIONS[3].angle, raw));
    setDragAngle(clamped);

    // snap to the nearest detent live, so the chime lands as you cross ON
    let nearest = 0;
    let best = Infinity;
    POSITIONS.forEach((p, i) => {
      const d = Math.abs(p.angle - clamped);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    goTo(nearest);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    const press = pressRef.current;
    pressRef.current = null;
    setDragAngle(null);
    if (!press || ignitedRef.current) return;

    // a tap (rather than a turn) advances one position
    if (!press.moved && performance.now() - press.t < 500) goTo(indexRef.current + 1);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (ignitedRef.current) return;
    if (["ArrowRight", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      goTo(indexRef.current + 1);
    } else if (["ArrowLeft", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      goTo(indexRef.current - 1);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(POSITIONS.length - 1);
    }
  };

  const displayAngle = dragAngle ?? POSITIONS[index].angle;
  const lit = index >= 2;
  const running = phase === "running" || phase === "exiting";
  const status = phase === "running" || phase === "exiting" ? "Running" : POSITIONS[index].status;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[var(--black)] ${
        phase === "exiting" ? "ignition-exit" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Ignition — start the site"
    >
      <DashboardGlow lit={lit} running={running} reducedMotion={reducedMotion} />

      {phase === "exiting" && !reducedMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {[18, 34, 52, 68, 82].map((top, i) => (
            <span
              key={top}
              className="skrt-streak absolute h-[2px] rounded-full"
              style={{
                top: `${top}%`,
                left: 0,
                width: `${30 + i * 12}%`,
                background: "linear-gradient(90deg, transparent, var(--accent-hi))",
                animationDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <span className="font-mono mb-8 text-[11px] uppercase tracking-[0.4em] text-[var(--ink-dim)]">
          DriveTheMus1c
        </span>

        <svg
          ref={svgRef}
          viewBox="0 0 300 300"
          className="h-[260px] w-[260px] touch-none select-none sm:h-[320px] sm:w-[320px]"
          style={{ cursor: ignitedRef.current ? "default" : "grab" }}
          role="slider"
          tabIndex={0}
          aria-label="Ignition switch"
          aria-valuemin={0}
          aria-valuemax={POSITIONS.length - 1}
          aria-valuenow={index}
          aria-valuetext={POSITIONS[index].key}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
        >
          <defs>
            <radialGradient id="ign-face" cx="35%" cy="28%" r="80%">
              <stop offset="0%" stopColor="#a9afb2" />
              <stop offset="100%" stopColor="#6f7578" />
            </radialGradient>
            <radialGradient id="ign-cyl" cx="35%" cy="28%" r="80%">
              <stop offset="0%" stopColor="#d2d7d9" />
              <stop offset="100%" stopColor="#9aa1a4" />
            </radialGradient>
          </defs>

          <circle cx="150" cy="150" r="144" fill="#23262820" stroke="#2f3335" strokeWidth="2" />
          <circle cx="150" cy="150" r="134" fill="#303436" />
          <circle cx="150" cy="150" r="118" fill="url(#ign-face)" stroke="#565c5f" strokeWidth="1.5" />

          {POSITIONS.map((p, i) => {
            const dot = polar(150, 150, 66, p.angle);
            const label = polar(150, 150, 95, p.angle);
            const active = i === index;
            return (
              <g key={p.key}>
                <circle cx={dot.x} cy={dot.y} r={active ? 5 : 3.5} fill={active ? "var(--accent-hi)" : "#4c5254"} />
                <text
                  x={label.x}
                  y={label.y}
                  transform={`rotate(${p.angle} ${label.x} ${label.y})`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="15"
                  letterSpacing="1.5"
                  fontFamily="'Barlow Condensed', sans-serif"
                  fill={active ? "var(--accent-hi)" : "#3f4547"}
                >
                  {p.key}
                </text>
              </g>
            );
          })}

          <g
            style={{
              transform: `rotate(${displayAngle}deg)`,
              transformOrigin: "150px 150px",
              transition: dragAngle === null ? "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
          >
            <circle cx="150" cy="150" r="48" fill="url(#ign-cyl)" stroke="#6d7477" strokeWidth="2" />
            <rect x="122" y="144" width="56" height="12" rx="3" fill="#33383a" />
          </g>
        </svg>

        <p className="font-display mt-8 text-2xl uppercase tracking-[0.2em] text-white" aria-live="polite">
          {status}
        </p>
        <p className="font-mono mt-2 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
          {ignitedRef.current ? "Pulling off" : "Drag, tap, or use arrow keys"}
        </p>

        <button
          type="button"
          onClick={finish}
          className="font-mono absolute bottom-8 inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-6 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)] hover:text-white"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
