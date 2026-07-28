import { useEffect, useState } from "react";

/** Point on a circle, angle measured from 12 o'clock going clockwise. */
function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} ${sweep} ${p1.x} ${p1.y}`;
}

const SWEEP_START = -135;
const SWEEP_END = 135;

type GaugeProps = {
  cx: number;
  cy: number;
  label: string;
  unit: string;
  ticks: string[];
  needle: number;
  redFrom?: number;
};

function Gauge({ cx, cy, label, unit, ticks, needle, redFrom }: GaugeProps) {
  const r = 132;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 26} fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.07)" />
      <path d={arcPath(cx, cy, r, SWEEP_START, SWEEP_END)} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      {redFrom !== undefined && (
        <path
          d={arcPath(cx, cy, r, redFrom, SWEEP_END)}
          fill="none"
          stroke="var(--warn)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}

      {ticks.map((t, i) => {
        const deg = SWEEP_START + ((SWEEP_END - SWEEP_START) * i) / (ticks.length - 1);
        const inner = polar(cx, cy, r - 16, deg);
        const outer = polar(cx, cy, r, deg);
        const lbl = polar(cx, cy, r - 38, deg);
        return (
          <g key={t}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--accent)" strokeWidth="2.5" />
            <text
              x={lbl.x}
              y={lbl.y}
              fill="rgba(255,255,255,0.55)"
              fontSize="17"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="'Roboto Mono', monospace"
            >
              {t}
            </text>
          </g>
        );
      })}

      <text
        x={cx}
        y={cy + 62}
        fill="var(--accent)"
        fontSize="20"
        textAnchor="middle"
        fontFamily="'Roboto Mono', monospace"
        letterSpacing="4"
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + 86}
        fill="rgba(255,255,255,0.4)"
        fontSize="14"
        textAnchor="middle"
        fontFamily="'Roboto Mono', monospace"
      >
        {unit}
      </text>

      <g
        style={{
          transform: `rotate(${needle}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <line x1={cx} y1={cy} x2={cx} y2={cy - r + 22} stroke="var(--accent-hi)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx={cx} cy={cy} r="11" fill="var(--accent-hi)" />
      <circle cx={cx} cy={cy} r="5" fill="rgba(0,0,0,0.6)" />
    </g>
  );
}

/** Studio telltales instead of car warning lights — the dash reads as a console. */
const TELLTALES = [
  { label: "REC", color: "var(--warn)" },
  { label: "MIC", color: "var(--accent-hi)" },
  { label: "48K", color: "var(--accent)" },
  { label: "MIX", color: "var(--accent)" },
];

type Props = {
  lit: boolean;
  running: boolean;
  reducedMotion: boolean;
};

export default function DashboardGlow({ lit, running, reducedMotion }: Props) {
  const [needle, setNeedle] = useState(SWEEP_START);

  useEffect(() => {
    if (!running) {
      setNeedle(SWEEP_START);
      return;
    }
    if (reducedMotion) {
      setNeedle(-38);
      return;
    }
    // startup self-test: needles swing full scale, then settle to idle
    const up = window.setTimeout(() => setNeedle(SWEEP_END), 60);
    const down = window.setTimeout(() => setNeedle(-38), 1000);
    return () => {
      window.clearTimeout(up);
      window.clearTimeout(down);
    };
  }, [running, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      style={{
        opacity: lit ? 1 : 0,
        transition: "opacity 1.1s ease-out",
      }}
    >
      <svg viewBox="0 0 1200 470" className="w-full max-w-[1200px]" style={{ filter: "drop-shadow(0 0 40px rgba(201,151,74,0.18))" }}>
        <Gauge
          cx={215}
          cy={230}
          label="BPM"
          unit="tempo"
          ticks={["0", "40", "80", "120", "160", "200"]}
          needle={needle}
        />
        <Gauge
          cx={985}
          cy={230}
          label="dB"
          unit="input level"
          ticks={["-60", "-40", "-24", "-12", "-6", "0"]}
          needle={needle}
          redFrom={97}
        />

        <g>
          {TELLTALES.map((t, i) => {
            const x = 600 + (i - 1.5) * 108;
            return (
              <g key={t.label} style={{ opacity: running ? 1 : 0.22, transition: `opacity 400ms ease-out ${i * 90}ms` }}>
                <rect x={x - 40} y={392} width="80" height="34" rx="4" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.08)" />
                <text
                  x={x}
                  y={414}
                  fill={t.color}
                  fontSize="16"
                  textAnchor="middle"
                  fontFamily="'Roboto Mono', monospace"
                  letterSpacing="2"
                >
                  {t.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
