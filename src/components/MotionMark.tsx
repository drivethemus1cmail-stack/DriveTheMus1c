export default function MotionMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <polyline points="4,6 18,20 4,34" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" opacity="0.35" />
      <polyline points="22,6 36,20 22,34" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" opacity="0.65" />
      <polyline points="40,6 54,20 40,34" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
