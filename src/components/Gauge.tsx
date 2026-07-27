const CX = 100;
const CY = 105;
const R = 78;

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
  { deg: 165, label: "-∞" },
  { deg: 135, label: "-24" },
  { deg: 105, label: "-12" },
  { deg: 75, label: "-6" },
  { deg: 45, label: "-3" },
  { deg: 15, label: "0" },
];

export default function Gauge({ className = "" }: { className?: string }) {
  const needleTip = point(90, R - 22);

  return (
    <div className={className}>
      <svg viewBox="-15 -5 230 145" className="w-full">
        <circle cx={CX} cy={CY} r={R + 16} fill="var(--bg-2)" stroke="var(--line)" strokeWidth="1" />

        <polyline points={arcPoints(180, 45)} fill="none" stroke="var(--gold)" strokeWidth="12" strokeLinecap="round" />
        <polyline points={arcPoints(45, 15)} fill="none" stroke="var(--gold-hi)" strokeWidth="12" strokeLinecap="round" />
        <polyline points={arcPoints(15, 0)} fill="none" stroke="var(--crimson)" strokeWidth="12" strokeLinecap="round" />

        {TICKS.map((tick) => {
          const inner = point(tick.deg, R - 10);
          const outer = point(tick.deg, R + 2);
          const label = point(tick.deg, R + 16);
          return (
            <g key={tick.deg}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--bg)" strokeWidth="1.5" />
              <text x={label.x} y={label.y} fontSize="9" textAnchor="middle" fill="var(--text-dim)" className="font-display">
                {tick.label}
              </text>
            </g>
          );
        })}

        <line
          x1={CX}
          y1={CY}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="var(--gold-hi)"
          strokeWidth="3"
          strokeLinecap="round"
          className="gauge-needle"
          style={{ ["--needle-angle" as string]: "24deg" }}
        />
        <circle cx={CX} cy={CY} r="6" fill="var(--gold-hi)" stroke="var(--bg)" strokeWidth="1.5" />
      </svg>
      <p className="mt-1 text-center font-display text-sm tracking-[0.2em] text-[var(--text-dim)]">
        Input Level &mdash; Stay Out Of The Red
      </p>
    </div>
  );
}
