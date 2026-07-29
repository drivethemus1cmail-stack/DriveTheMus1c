import MotionMark from "./MotionMark";
import AlbumBackdrop from "./AlbumBackdrop";

type LinkItem = {
  label: string;
  handle: string;
  href: string;
  blurb: string;
};

const LINKS: LinkItem[] = [
  {
    label: "Instagram",
    handle: "@des1_iii",
    href: "https://www.instagram.com/des1_iii/",
    blurb: "Behind the sessions, new drops, and studio clips.",
  },
  {
    label: "SoundCloud",
    handle: "Des1",
    href: "https://on.soundcloud.com/MPAwHIBFLmssuXoqfa",
    blurb: "Tracks and beats, including the demo playing on this site.",
  },
  {
    label: "Everything",
    handle: "linktr.ee/Des1__",
    href: "https://linktr.ee/Des1__",
    blurb: "Every platform in one place.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MyMusic() {
  return (
    <section className="grain relative min-h-[calc(100vh-73px)] overflow-hidden bg-[var(--black)] px-6 pb-24 pt-24 sm:px-10">
      <AlbumBackdrop index={0} />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <MotionMark className="mx-auto mb-6 h-7 w-12" />
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--ink-dim)]">
            Follow DES1
          </span>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[1] tracking-tight text-white sm:text-6xl">
            My Music
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[var(--ink-dim)]">
            The artist behind the templates. The demo track on this site is mine &mdash;
            everything else lives here.
          </p>
        </div>

        <ul className="mt-14 space-y-4">
          {LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[44px] items-center justify-between gap-5 rounded-lg border border-white/10 bg-[var(--panel)] p-5 transition-colors hover:border-[var(--accent)]/60"
              >
                <span className="min-w-0">
                  <span className="font-display block text-2xl uppercase leading-tight text-white">
                    {item.label}
                  </span>
                  <span className="font-mono mt-1 block truncate text-[11px] uppercase tracking-[0.2em] text-[var(--accent-hi)]">
                    {item.handle}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--ink-dim)]">
                    {item.blurb}
                  </span>
                </span>
                <span className="text-[var(--ink-dim)] transition-colors group-hover:text-[var(--accent-hi)]">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono mt-14 text-center text-[11px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
          Links open in a new tab
        </p>
      </div>
    </section>
  );
}
