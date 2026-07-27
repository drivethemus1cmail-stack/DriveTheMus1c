import CarMark from "./CarMark";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-2xl tracking-wide text-[var(--text)]">
          <CarMark className="h-6 w-11" />
          Drive<span className="text-gold-foil">The</span>Mus<span className="text-[var(--crimson)]">1</span>c
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-[var(--text-dim)] sm:flex">
          <a href="#included" className="transition-colors hover:text-[var(--text)]">What's Included</a>
          <a href="#mission" className="transition-colors hover:text-[var(--text)]">Mission</a>
          <a href="#contact" className="transition-colors hover:text-[var(--text)]">Contact</a>
        </nav>
        <a
          href="#included"
          className="rounded-full border border-[var(--gold)]/60 bg-[var(--gold)] px-4 py-2 font-display text-sm tracking-wide text-[#1a1206] transition-colors hover:bg-[var(--gold-hi)]"
        >
          Get the Pack
        </a>
      </div>
    </header>
  );
}
