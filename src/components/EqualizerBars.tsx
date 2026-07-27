const HEIGHTS = [40, 70, 100, 55, 85, 30, 95, 60, 45, 75, 35, 65];

export default function EqualizerBars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-1.5 ${className}`}>
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="eq-bar w-2 rounded-sm bg-gradient-to-t from-cyan-400 to-amber-300"
          style={{
            height: `${h}px`,
            animationDelay: `${(i % 6) * 0.12}s`,
            backgroundImage: "linear-gradient(to top, var(--cyan), var(--amber))",
          }}
        />
      ))}
    </div>
  );
}
