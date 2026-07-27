export default function RoadSign({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[3px] border-2 border-[var(--reflector)]/70 bg-[var(--sign-green)] px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_16px_var(--sign-green-dim)]">
      {children}
    </span>
  );
}
