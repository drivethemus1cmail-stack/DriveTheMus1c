const STREAKS = [
  { y: 60, w: 260, op: 0.5, color: "var(--gold)" },
  { y: 130, w: 420, op: 0.35, color: "var(--gold)" },
  { y: 210, w: 180, op: 0.3, color: "var(--crimson)" },
  { y: 300, w: 340, op: 0.25, color: "var(--gold)" },
  { y: 390, w: 220, op: 0.2, color: "var(--crimson)" },
];

export default function MotionStreaks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 500" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="glow" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="900" height="500" fill="url(#glow)" />
      {STREAKS.map((s, i) => (
        <rect
          key={i}
          x={-100}
          y={s.y}
          width={s.w}
          height={i % 2 === 0 ? 3 : 5}
          rx="2"
          fill={s.color}
          opacity={s.op}
          transform="skewY(-8)"
        />
      ))}
    </svg>
  );
}
