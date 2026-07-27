export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gold-foil inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 bg-[var(--panel)] px-4 py-1.5 font-display text-sm font-semibold uppercase tracking-[0.25em] shadow-[0_0_18px_var(--gold-glow)]">
      {children}
    </span>
  );
}
