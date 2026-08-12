const HEIGHTS = [35, 60, 90, 50, 78, 28, 88, 55, 40, 68, 32, 58];

export default function LevelMeter({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end justify-center gap-1.5 ${className}`}>
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="meter-bar w-1.5 rounded-[1px]"
          style={{
            height: `${h}%`,
            animationDelay: `${(i % 6) * 0.12}s`,
            background: "linear-gradient(to top, var(--accent), var(--accent-hi))",
          }}
        />
      ))}
    </div>
  );
}
