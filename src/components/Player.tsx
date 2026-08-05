import { useMusic, formatTime } from "../audio/MusicContext";

function Icon({ d, filled = false }: { d: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const PLAY = "M8 5.5v13l11-6.5z";
const PAUSE = "M9 5h2.5v14H9zM12.5 5H15v14h-2.5z";
const NEXT = "M7 5l9 7-9 7zM17 5h2v14h-2z";
const PREV = "M17 5l-9 7 9 7zM5 5h2v14H5z";

export default function Player() {
  const {
    playing, tracks, index, track, currentTime, duration,
    toggle, next, prev, playAt, seek,
  } = useMusic();

  const single = tracks.length < 2;
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-[var(--panel)] p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-hi)]">
            {playing ? "Now playing" : "Paused"}
          </span>
          <h3 className="font-display mt-1 truncate text-3xl uppercase text-white">{track.title}</h3>
          <p className="mt-1 truncate text-sm text-[var(--ink-dim)]">{track.credit}</p>
        </div>
        {track.spotify && (
          <a
            href={track.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-[var(--accent)]/50 px-4 text-[11px] uppercase tracking-[0.2em] text-[var(--accent-hi)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1206]"
          >
            Save
          </a>
        )}
      </div>

      {/* Seek. The input is 44px tall for touch but the visible bar is thin. */}
      <div className="relative mt-6">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/12">
          <div
            className="h-full rounded-full bg-[var(--accent-hi)]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={Number.isFinite(duration) && duration > 0 ? duration : 0}
          step={0.1}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label={`Seek within ${track.title}`}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          className="seek-slider relative h-[44px] w-full"
        />
      </div>

      <div className="font-mono flex justify-between text-[11px] tabular-nums text-[var(--ink-dim)]">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={prev}
          disabled={single}
          aria-label="Previous track"
          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full text-[var(--ink-dim)] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <Icon d={PREV} filled />
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
          className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[var(--accent)] text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
        >
          <Icon d={playing ? PAUSE : PLAY} filled />
        </button>

        <button
          type="button"
          onClick={next}
          disabled={single}
          aria-label="Next track"
          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full text-[var(--ink-dim)] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <Icon d={NEXT} filled />
        </button>
      </div>

      {/* Queue. Hidden while there's only one track — a "queue" of one is noise. */}
      {!single && (
        <ol className="mt-7 border-t border-white/10 pt-4">
          {tracks.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => playAt(i)}
                aria-current={i === index}
                className={`flex min-h-[48px] w-full items-center gap-4 px-1 text-left transition-colors ${
                  i === index ? "text-[var(--accent-hi)]" : "text-[var(--ink-dim)] hover:text-white"
                }`}
              >
                <span className="font-mono w-5 shrink-0 text-[11px] tabular-nums">
                  {i === index && playing ? "▶" : String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm">{t.title}</span>
                <span className="font-mono hidden shrink-0 text-[10px] uppercase tracking-[0.2em] sm:inline">
                  {t.credit}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
