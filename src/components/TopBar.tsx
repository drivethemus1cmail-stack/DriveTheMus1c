const SESSION_DATE = new Date()
  .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
  .toUpperCase();

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--black)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="font-display text-xl uppercase tracking-wide text-white">
          Drive<span className="text-accent-foil">The</span>Mus<span className="text-accent-foil">1</span>c
        </a>

        <span className="font-mono hidden text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] md:block">
          {SESSION_DATE} &middot; Beginner Recording Pack &middot; v1.0
        </span>

        <nav className="flex items-center gap-6">
          <a href="#included" className="font-mono hidden text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] transition-colors hover:text-white sm:inline">
            Included
          </a>
          <a href="#rights" className="font-mono hidden text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] transition-colors hover:text-white sm:inline">
            Rights
          </a>
          <a
            href="#included"
            className="font-mono rounded-full bg-[var(--accent)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
          >
            Get the Pack
          </a>
        </nav>
      </div>
    </header>
  );
}
