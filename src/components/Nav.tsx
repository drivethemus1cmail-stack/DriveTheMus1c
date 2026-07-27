export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--asphalt)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-2xl font-semibold tracking-wide text-[var(--text)]">
          Drive<span className="text-[var(--lane)]">The</span>Mus<span className="text-[var(--sign-green)]">1</span>c
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-[var(--text-dim)] sm:flex">
          <a href="#included" className="transition-colors hover:text-[var(--text)]">What's Included</a>
          <a href="#mission" className="transition-colors hover:text-[var(--text)]">Mission</a>
          <a href="#contact" className="transition-colors hover:text-[var(--text)]">Contact</a>
        </nav>
        <a
          href="#included"
          className="rounded-[3px] border-2 border-[var(--reflector)]/60 bg-[var(--sign-green)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--sign-green)]/80"
        >
          Get the Pack
        </a>
      </div>
    </header>
  );
}
