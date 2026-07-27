export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--line)] bg-[var(--asphalt-2)] px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <span className="font-display text-xl font-semibold text-[var(--text)]">
          Drive<span className="text-[var(--cyan)]">The</span>Mus<span className="text-[var(--amber)]">1</span>c
        </span>
        <p className="max-w-md text-sm text-[var(--text-dim)]">
          Got a question about a template, or want something custom for your next drop?
          Reach out and let's get you on the road.
        </p>
        <a
          href="mailto:hello@drivethemusic.com"
          className="rounded-full border border-[var(--line)] px-6 py-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--amber)] hover:text-[var(--amber)]"
        >
          hello@drivethemusic.com
        </a>
        <p className="mt-6 text-xs text-[var(--text-dim)]">
          &copy; {new Date().getFullYear()} DriveTheMus1c. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
