import { useEffect, useState } from "react";
import { buyLinkProps } from "../config";
import { Link, useRouter } from "../router";
import MiniPlayer from "./MiniPlayer";
import Wordmark3D from "./Wordmark3D";

const SESSION_DATE = new Date()
  .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
  .toUpperCase();

/**
 * CSS `hidden` still mounts the component, so a phone would build a WebGL
 * context and pull Three.js for a logo it never shows. Gate on the query so it
 * genuinely doesn't mount below the breakpoint.
 */
function useMinWidth(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const NAV_SECTIONS = [
  { id: "included", label: "The Pack" },
  { id: "services", label: "Services" },
];

const REPLAY = "M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z";

export default function TopBar({ onReplayIntro }: { onReplayIntro: () => void }) {
  const { path, navigate } = useRouter();
  const wide = useMinWidth("(min-width: 640px)");

  /**
   * Section links live on the home page. From /music, route home first and then
   * scroll — a plain hash link would full-page reload and stop the music.
   */
  const goToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    if (path !== "/") {
      navigate("/");
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    } else {
      scroll();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--black)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-y-3 px-6 py-3 sm:px-10">
        <Link
          to="/"
          className="mr-auto inline-flex min-h-[44px] items-center"
          aria-label="DriveTheMus1c — home"
        >
          {/* Flat lockup on phones: a 34px-tall 3D wordmark is illegible detail,
              it crowds the nav onto a third row, and it costs a WebGL context on
              the device least able to spare one. */}
          {wide ? (
            <Wordmark3D
              motion="sway"
              exposure={2.1}
              fov={20}
              className="h-[38px] w-[210px]"
              fallback={
                <span className="font-display text-xl uppercase tracking-wide text-white">
                  Drive<span className="text-accent-foil">The</span>Mus
                  <span className="text-accent-foil">1</span>c
                </span>
              }
            />
          ) : (
            <span className="font-display text-base uppercase tracking-wide text-white">
              Drive<span className="text-accent-foil">The</span>Mus
              <span className="text-accent-foil">1</span>c
            </span>
          )}
        </Link>

        {/* Decorative utility strip — yields to the mini player, which now needs
            the room. Only appears once there's genuinely space for both. */}
        <span className="font-mono mr-auto hidden text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] 2xl:block">
          {SESSION_DATE} &middot; Beginner Recording Pack &middot; v1.0
        </span>

        <nav className="flex items-center gap-2 sm:gap-6">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              onClick={(e) => goToSection(e, s.id)}
              className="font-mono hidden min-h-[44px] items-center whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] transition-colors hover:text-white md:inline-flex"
            >
              {s.label}
            </a>
          ))}

          <button
            type="button"
            onClick={onReplayIntro}
            aria-label="Replay intro"
            title="Replay intro"
            className="font-mono inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d={REPLAY} />
            </svg>
            <span className="hidden xl:inline">Intro</span>
          </button>

          <Link
            to="/music"
            className={`font-mono inline-flex min-h-[44px] items-center whitespace-nowrap text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-white ${
              path === "/music" ? "text-[var(--accent-hi)]" : "text-[var(--ink-dim)]"
            }`}
          >
            My Music
          </Link>

          <a
            {...buyLinkProps}
            className="font-mono inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-[var(--accent)] px-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)] sm:px-5"
          >
            Get the Pack
          </a>
        </nav>

        {/* Own row on mobile so the slider isn't crushed; inline on wider screens. */}
        <div className="order-last flex w-full justify-center sm:order-none sm:ml-6 sm:w-auto">
          <MiniPlayer />
        </div>
      </div>
    </header>
  );
}
