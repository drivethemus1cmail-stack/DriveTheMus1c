import { useMusic, formatTime } from "../audio/MusicContext";
import { artUrl } from "../config";
import { Link, useRouter } from "../router";

function Glyph({ d, className = "h-4 w-4" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const PLAY = "M8 5.14v13.72L19 12z";
const PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z";
const SPEAKER = "M4 9v6h4l5 4V5L8 9H4z";
const WAVE_1 = "M16.5 8.8a4.5 4.5 0 0 1 0 6.4l1.4 1.4a6.5 6.5 0 0 0 0-9.2z";
const MUTED_X = "M17 9.6l1.4-1.4 4.4 4.4-1.4 1.4z M21.4 8.2l1.4 1.4-4.4 4.4-1.4-1.4z";

/**
 * Header mini player — the same pieces as the full player on /music (cover,
 * title, transport, level) at a size that fits a nav bar. Progress lives on the
 * pill's bottom edge rather than as another control, so the strip stays legible
 * at a glance without adding another thing to aim at.
 */
export default function MiniPlayer() {
  const { started, playing, track, currentTime, duration, muted, volume, toggle, toggleMute, setVolume } = useMusic();
  const { path } = useRouter();

  const cover = artUrl(track);
  const audible = started && !muted && volume > 0;
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const onMusicPage = path === "/music";

  return (
    <div className="relative flex items-center gap-2 overflow-hidden rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-1.5 pr-3">
      {/* Cover doubles as the route into the full player. The art is 36px for
          balance against the pill, but the tap area is a full 44. */}
      {onMusicPage ? (
        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center">
          <span className="block h-9 w-9 overflow-hidden rounded-full">
            <CoverImage cover={cover} />
          </span>
        </span>
      ) : (
        <Link
          to="/music"
          aria-label={`${track.title} — open the full player`}
          className="group flex h-[44px] w-[44px] shrink-0 items-center justify-center"
        >
          <span className="block h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10 transition-transform group-hover:scale-105">
            <CoverImage cover={cover} />
          </span>
        </Link>
      )}

      {/* Title block — desktop only; the cover carries the identity on mobile. */}
      <span className="hidden min-w-0 flex-col leading-tight lg:flex">
        <span className="font-mono truncate text-[10px] uppercase tracking-[0.2em] text-[var(--accent-hi)]">
          {!started ? "Play demo" : playing ? "Now playing" : "Paused"}
        </span>
        <span className="max-w-[128px] truncate text-[11px] font-medium text-white">{track.title}</span>
      </span>

      <button
        type="button"
        onClick={toggle}
        aria-label={!started ? `Play ${track.title}` : playing ? `Pause ${track.title}` : `Play ${track.title}`}
        className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-white transition-colors hover:text-[var(--accent-hi)]"
      >
        <Glyph d={playing ? PAUSE : PLAY} className="h-[18px] w-[18px]" />
      </button>

      <button
        type="button"
        onClick={toggleMute}
        aria-pressed={muted}
        aria-label={muted ? "Unmute" : "Mute"}
        className="inline-flex h-[44px] w-[36px] shrink-0 items-center justify-center text-[var(--ink-dim)] transition-colors hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
          <path d={SPEAKER} />
          <path d={audible ? WAVE_1 : MUTED_X} />
        </svg>
      </button>

      <label className="hidden items-center sm:flex">
        <span className="sr-only">Demo track volume</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(e) => setVolume(Number(e.target.value) / 100)}
          aria-label="Demo track volume"
          className="volume-slider w-16 lg:w-20"
          style={{ ["--fill" as string]: `${Math.round(volume * 100)}%` }}
        />
      </label>

      <span className="font-mono hidden w-9 shrink-0 text-right text-[10px] tabular-nums text-[var(--ink-dim)] xl:inline">
        {started ? formatTime(currentTime) : "--:--"}
      </span>

      {/* Progress hairline on the pill's edge — information, not a control. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/10"
      >
        <span className="block h-full bg-[var(--accent-hi)]" style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}

function CoverImage({ cover }: { cover: string | null }) {
  if (!cover) {
    return (
      <span className="flex h-full w-full items-center justify-center bg-[var(--charcoal)]">
        <span className="font-display text-[10px] text-accent-foil">DTM</span>
      </span>
    );
  }
  return (
    <img
      src={cover}
      alt=""
      width={640}
      height={640}
      loading="eager"
      decoding="async"
      className="h-full w-full object-cover"
    />
  );
}
