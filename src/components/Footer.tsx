import MotionMark from "./MotionMark";

export default function Footer() {
  return (
    <footer id="contact" className="grain relative overflow-hidden bg-[var(--black)] px-6 pt-28 text-center sm:px-10">
      <MotionMark className="mx-auto mb-8 h-7 w-12" />
      <h2 className="font-display mx-auto max-w-xl text-4xl uppercase leading-tight tracking-tight text-white sm:text-5xl">
        Your first session is waiting.
      </h2>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#included"
          className="font-display rounded-full bg-[var(--accent)] px-8 py-3 text-lg uppercase tracking-wide text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
        >
          Get the Pack
        </a>
        <a
          href="mailto:drivethemus1cmail@gmail.com"
          className="font-display border border-white/15 px-8 py-3 text-lg uppercase tracking-wide text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-hi)]"
        >
          Contact
        </a>
      </div>

      <div className="mt-24 flex flex-col items-center gap-4 border-t border-white/10 py-8 sm:flex-row sm:justify-between">
        <span className="font-display text-lg uppercase text-white">
          Drive<span className="text-accent-foil">The</span>Mus<span className="text-accent-foil">1</span>c
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
          &copy; {new Date().getFullYear()} DriveTheMus1c. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
