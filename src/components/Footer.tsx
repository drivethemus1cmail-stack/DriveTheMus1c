export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--line)] bg-[var(--asphalt-2)] px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <span className="font-display text-xl font-semibold text-[var(--text)]">
          Drive<span className="text-[var(--lane)]">The</span>Mus<span className="text-[var(--sign-green)]">1</span>c
        </span>
        <p className="max-w-md text-sm text-[var(--text-dim)]">
          Questions about a template, missing files, or something you need help with? We're here
          to keep you moving.
        </p>
        <a
          href="mailto:drivethemus1cmail@gmail.com"
          className="rounded-[3px] border border-[var(--line)] px-6 py-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--sign-green)] hover:text-[var(--sign-green)]"
        >
          drivethemus1cmail@gmail.com
        </a>
        <p className="mt-6 text-xs text-[var(--text-dim)]">
          &copy; {new Date().getFullYear()} DriveTheMus1c. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
