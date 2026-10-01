import MotionMark from "./MotionMark";
import AlbumBackdrop from "./AlbumBackdrop";
import Player from "./Player";
import { INSTAGRAM_URL, SPOTIFY_ARTIST_URL } from "../config";

type LinkItem = {
  label: string;
  handle: string;
  href: string;
  blurb: string;
};

const FEATURED: LinkItem = {
  label: "Instagram",
  handle: "@drivethemus1c",
  href: INSTAGRAM_URL,
  blurb: "The main page — new drops, studio sessions, and pack updates.",
};

const MORE_LINKS: LinkItem[] = [
  {
    label: "Spotify",
    handle: "Des1",
    href: SPOTIFY_ARTIST_URL,
    blurb: "Every release — the songs playing on this site.",
  },
  {
    label: "Instagram",
    handle: "@des1_iii",
    href: "https://www.instagram.com/des1_iii/",
    blurb: "Des1's personal page.",
  },
  {
    label: "SoundCloud",
    handle: "Des1",
    href: "https://on.soundcloud.com/MPAwHIBFLmssuXoqfa",
    blurb: "Tracks and beats.",
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

function LinkCard({ item, featured = false }: { item: LinkItem; featured?: boolean }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex min-h-[44px] items-center justify-between gap-5 rounded-lg border bg-[var(--panel)] transition-colors hover:border-[var(--accent)]/60 ${
        featured ? "border-[var(--accent)]/40 p-6 sm:p-7" : "border-white/10 p-5"
      }`}
    >
      <span className="min-w-0">
        <span
          className={`font-display block uppercase leading-tight text-white ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}
        >
          {item.label}
        </span>
        <span className="font-mono mt-1 block truncate text-[11px] uppercase tracking-[0.2em] text-[var(--accent-hi)]">
          {item.handle}
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-[var(--ink-dim)]">{item.blurb}</span>
      </span>
      <span className="text-[var(--ink-dim)] transition-colors group-hover:text-[var(--accent-hi)]">
        <ArrowIcon />
      </span>
    </a>
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
            The artist behind the templates. Every song playing on this site is mine &mdash;
            everything else lives here.
          </p>
        </div>

        <div className="mt-12">
          <Player />
        </div>

        <h2 className="font-mono mt-16 text-center text-[11px] uppercase tracking-[0.35em] text-[var(--ink-dim)]">
          Find me everywhere
        </h2>

        <div className="mt-6">
          <LinkCard item={FEATURED} featured />
        </div>

        <h2 className="font-mono mt-12 text-center text-[11px] uppercase tracking-[0.35em] text-[var(--ink-dim)]">
          More links
        </h2>

        <ul className="mt-6 space-y-4">
          {MORE_LINKS.map((item) => (
            <li key={item.href}>
              <LinkCard item={item} />
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
