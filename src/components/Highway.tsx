const DASH_COUNT = 12;
const POST_COUNT = 9;

function ease(t: number) {
  return Math.pow(t, 1.8);
}

export default function Highway({ className = "" }: { className?: string }) {
  const dashes = Array.from({ length: DASH_COUNT }, (_, i) => {
    const t = ease(i / (DASH_COUNT - 1));
    const y = 560 - t * 480;
    const h = 30 - t * 25;
    const w = 12 - t * 9;
    return { key: i, x: 400 - w / 2, y, w, h };
  });

  const posts = Array.from({ length: POST_COUNT }, (_, i) => {
    const t = ease(i / (POST_COUNT - 1));
    const y = 560 - t * 480;
    const spread = 380 - t * 340;
    const h = 26 - t * 20;
    return { key: i, y, leftX: 400 - spread, rightX: 400 + spread, h };
  });

  return (
    <svg
      viewBox="0 0 800 560"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="horizon-glow" cx="50%" cy="10%" r="60%">
          <stop offset="0%" stopColor="var(--sign-green)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--sign-green)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="road-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--asphalt-2)" stopOpacity="0" />
          <stop offset="70%" stopColor="var(--asphalt-2)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--asphalt)" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="560" fill="url(#horizon-glow)" />

      {/* road surface */}
      <polygon points="60,560 740,560 430,80 370,80" fill="var(--asphalt-2)" />

      {/* road edges */}
      <line x1="60" y1="560" x2="370" y2="80" stroke="var(--reflector)" strokeWidth="3" opacity="0.5" />
      <line x1="740" y1="560" x2="430" y2="80" stroke="var(--reflector)" strokeWidth="3" opacity="0.5" />

      {/* guardrail posts */}
      {posts.map((p) => (
        <g key={p.key} opacity="0.6">
          <rect x={p.leftX - 2} y={p.y} width="4" height={p.h} fill="var(--reflector)" />
          <rect x={p.rightX - 2} y={p.y} width="4" height={p.h} fill="var(--reflector)" />
        </g>
      ))}

      {/* center dashed lane line, perspective-scaled */}
      {dashes.map((d) => (
        <rect key={d.key} x={d.x} y={d.y} width={d.w} height={d.h} rx={d.w / 3} fill="var(--lane)" />
      ))}

      <rect x="0" y="0" width="800" height="560" fill="url(#road-fade)" />
    </svg>
  );
}
