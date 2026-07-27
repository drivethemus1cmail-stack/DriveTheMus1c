const CX = 100;
const CY = 110;
const R = 85;

function point(angleDeg: number, radius = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY - radius * Math.sin(rad) };
}

function arcPoints(startDeg: number, endDeg: number, steps = 24) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = startDeg + ((endDeg - startDeg) * i) / steps;
    const p = point(t);
    return `${p.x},${p.y}`;
  }).join(" ");
}

const TICKS = [
  { deg: 170, label: "-∞" },
  { deg: 150, label: "-24" },
  { deg: 110, label: "-12" },
  { deg: 70, label: "-6" },
  { deg: 40, label: "-3" },
  { deg: 10, label: "0" },
];

export default function Gauge({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 130" className="w-full">
        <polyline points={arcPoints(180, 40)} fill="none" stroke="var(--sign-green)" strokeWidth="14" strokeLinecap="round" />
        <polyline points={arcPoints(40, 15)} fill="none" stroke="var(--lane)" strokeWidth="14" strokeLinecap="round" />
        <polyline points={arcPoints(15, 0)} fill="none" stroke="var(--caution-red)" strokeWidth="14" strokeLinecap="round" />

        {TICKS.map((tick) => {
          const inner = point(tick.deg, R - 12);
          const outer = point(tick.deg, R + 4);
          const label = point(tick.deg, R + 18);
          return (
            <g key={tick.deg}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--text-dim)" strokeWidth="1.5" />
              <text x={label.x} y={label.y} fontSize="9" textAnchor="middle" fill="var(--text-dim)" className="font-display">
                {tick.label}
              </text>
            </g>
          );
        })}

        <g style={{ ["--needle-angle" as string]: "22deg" }}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - R + 18} stroke="var(--reflector)" strokeWidth="3" strokeLinecap="round" className="gauge-needle" />
        </g>
        <circle cx={CX} cy={CY} r="6" fill="var(--reflector)" />
      </svg>
      <p className="mt-1 text-center font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-dim)]">
        Input Level &mdash; Stay Out Of The Red
      </p>
    </div>
  );
}
