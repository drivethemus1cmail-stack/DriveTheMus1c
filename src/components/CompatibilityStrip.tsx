const ITEMS = ["FL Studio 25.2.5+", "Stock plugins only", ".flp + .fst files", "One-time purchase"];

export default function CompatibilityStrip() {
  return (
    <section className="border-b border-[var(--off-white-dim)] bg-[var(--off-white)] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--charcoal)]/60">
          Built For
        </span>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {ITEMS.map((item) => (
            <li key={item} className="font-display text-lg uppercase tracking-wide text-[var(--charcoal)]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
