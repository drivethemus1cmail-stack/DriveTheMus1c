import { useMusic } from "../audio/MusicContext";
import { buyLinkProps } from "../config";

const SESSION_DATE = new Date()
  .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
  .toUpperCase();

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
      {muted ? (
        <path d="M17 9l4 6M21 9l-4 6" strokeLinecap="round" />
      ) : (
        <path d="M17 8.5a4.5 4.5 0 0 1 0 7" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function TopBar() {
  const { started, muted, toggleMute } = useMusic();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--black)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="font-display inline-flex min-h-[44px] items-center text-xl uppercase tracking-wide text-white">
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
          {started && (
            <button
              type="button"
              onClick={toggleMute}
              aria-pressed={muted}
              aria-label={muted ? "Unmute demo track" : "Mute demo track"}
              title={muted ? "Unmute demo track" : "Mute demo track"}
              className="font-mono inline-flex min-h-[44px] items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] transition-colors hover:text-white"
            >
              <SpeakerIcon muted={muted} />
              <span className="hidden sm:inline">{muted ? "Off" : "On"}</span>
            </button>
          )}
          <a
            {...buyLinkProps}
            className="font-mono inline-flex min-h-[44px] items-center rounded-full bg-[var(--accent)] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
          >
            Get the Pack
          </a>
        </nav>
      </div>
    </header>
  );
}
