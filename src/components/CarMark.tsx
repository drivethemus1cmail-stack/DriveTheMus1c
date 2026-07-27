type Props = {
  className?: string;
  variant?: "outline" | "watermark";
};

const CAR_PATH =
  "M10 32 L14 32 L18 22 Q22 16 30 16 L55 16 Q60 16 63 20 L70 28 L92 28 Q98 28 98 34 L98 38 L92 38 Q92 44 86 44 Q80 44 80 38 L40 38 Q40 44 34 44 Q28 44 28 38 L10 38 Z";

export default function CarMark({ className = "", variant = "outline" }: Props) {
  const isWatermark = variant === "watermark";
  return (
    <svg viewBox="-30 0 150 50" className={className} aria-hidden="true">
      {!isWatermark && (
        <>
          <line x1="-28" y1="30" x2="-6" y2="30" stroke="var(--gold)" strokeWidth="2" opacity="0.5" />
          <line x1="-28" y1="36" x2="-14" y2="36" stroke="var(--gold)" strokeWidth="2" opacity="0.3" />
        </>
      )}
      <path
        d={CAR_PATH}
        fill={isWatermark ? "var(--gold)" : "none"}
        stroke="var(--gold)"
        strokeWidth={isWatermark ? 0 : 2.5}
        strokeLinejoin="round"
      />
      <circle cx="34" cy="38" r="6" fill={isWatermark ? "var(--gold)" : "var(--bg)"} stroke="var(--gold)" strokeWidth="2.5" />
      <circle cx="86" cy="38" r="6" fill={isWatermark ? "var(--gold)" : "var(--bg)"} stroke="var(--gold)" strokeWidth="2.5" />
    </svg>
  );
}
