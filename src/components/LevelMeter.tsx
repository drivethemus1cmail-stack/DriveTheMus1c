const HEIGHTS = [35, 60, 90, 50, 78, 28, 88, 55, 40, 68, 32, 58];

export default function LevelMeter({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end justify-center gap-1.5 ${className}`}>
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="meter-bar w-2 rounded-sm"
          style={{
            height: `${h}px`,
            animationDelay: `${(i % 6) * 0.12}s`,
            background: "linear-gradient(to top, var(--gold), var(--gold-hi) 70%, var(--crimson))",
          }}
        />
      ))}
    </div>
  );
}
