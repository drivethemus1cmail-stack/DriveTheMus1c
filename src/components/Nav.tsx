export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--asphalt)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-2xl font-semibold tracking-wide text-[var(--text)]">
          Drive<span className="text-[var(--cyan)]">The</span>Mus<span className="text-[var(--amber)]">1</span>c
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-[var(--text-dim)] sm:flex">
          <a href="#templates" className="transition-colors hover:text-[var(--text)]">Templates</a>
          <a href="#about" className="transition-colors hover:text-[var(--text)]">About</a>
          <a href="#contact" className="transition-colors hover:text-[var(--text)]">Contact</a>
        </nav>
        <a
          href="#templates"
          className="rounded-full border border-[var(--amber)]/50 bg-[var(--amber)]/10 px-4 py-2 text-sm font-semibold text-[var(--amber)] transition-colors hover:bg-[var(--amber)]/20"
        >
          Browse Templates
        </a>
      </div>
    </header>
  );
}
