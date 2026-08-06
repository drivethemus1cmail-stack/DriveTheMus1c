import { useEffect, useRef, useState } from "react";
import { useMusic, formatTime } from "../audio/MusicContext";
import { artUrl } from "../config";

function Glyph({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const PLAY = "M8 5.14v13.72L19 12z";
const PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z";
const NEXT = "M6 5l9 7-9 7zM17 5h2.5v14H17z";
const PREV = "M18 5l-9 7 9 7zM4.5 5H7v14H4.5z";
const EXTERNAL = "M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14zM5 5h5v2H7v10h10v-3h2v5H5z";

/** Static bars that suggest a waveform without pretending to analyse the audio. */
function Bars({ active }: { active: boolean }) {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={active ? "meter-bar w-[2px] rounded-[1px]" : "w-[2px] rounded-[1px]"}
          style={{
            height: active ? `${[55, 100, 40, 80][i]}%` : "35%",
            background: active ? "var(--accent-hi)" : "var(--ink-dim)",
            animationDelay: `${i * 0.14}s`,
          }}
        />
      ))}
    </span>
  );
}

export default function Player() {
  const {
    playing, tracks, index, track, currentTime, duration,
    toggle, next, prev, playAt, seek,
  } = useMusic();

  const single = tracks.length < 2;
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const cover = artUrl(track);

  // Show the position being dragged rather than fighting the audio's own
  // timeupdate events mid-scrub.
  const [scrub, setScrub] = useState<number | null>(null);
  const scrubbing = scrub !== null;
  const shownTime = scrubbing ? scrub : currentTime;
  const shownPct = duration > 0 ? (shownTime / duration) * 100 : 0;

  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scrubbing) return;
    const end = () => {
      if (scrub !== null) seek(scrub);
      setScrub(null);
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [scrubbing, scrub, seek]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
      <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-7">
        {/* Cover */}
        <div className="relative mx-auto aspect-square w-40 shrink-0 overflow-hidden rounded-lg sm:mx-0 sm:w-36">
          {cover ? (
            <img
              src={cover}
              alt={`${track.album} cover art`}
              width={640}
              height={640}
              /* The cover is the centrepiece and sits at the fold — deferring it
                 would delay the one image that matters. */
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[var(--charcoal)]">
              <span className="font-display text-3xl text-accent-foil">DTM</span>
            </div>
          )}
        </div>

        {/* Meta + controls */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Bars active={playing} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-hi)]">
              {playing ? "Now playing" : "Paused"}
            </span>
          </div>

          <h3 className="font-display mt-2 truncate text-4xl uppercase leading-none text-white">
            {track.title}
          </h3>
          <p className="mt-2 truncate text-sm text-[var(--text)]">{track.artists}</p>
          <p className="font-mono mt-1 truncate text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
            {track.album} &middot; {track.year}
          </p>

          {/* Seek */}
          <div className="relative mt-5">
            <div
              ref={barRef}
              className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/15"
            >
              <div className="h-full rounded-full bg-[var(--accent-hi)]" style={{ width: `${shownPct}%` }} />
            </div>
            <div
              className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--accent-hi)] shadow-[0_0_0_3px_var(--black)] transition-opacity"
              style={{ left: `calc(${shownPct}% - 6px)`, opacity: pct > 0 || scrubbing ? 1 : 0 }}
            />
            <input
              type="range"
              min={0}
              max={Number.isFinite(duration) && duration > 0 ? duration : 0}
              step={0.1}
              value={shownTime}
              onPointerDown={() => setScrub(currentTime)}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (scrubbing) setScrub(v);
                else seek(v);
              }}
              aria-label={`Seek within ${track.title}`}
              aria-valuetext={`${formatTime(shownTime)} of ${formatTime(duration)}`}
              className="seek-slider relative h-[44px] w-full"
            />
            <div className="font-mono -mt-1 flex justify-between text-[10px] tabular-nums text-[var(--ink-dim)]">
              <span>{formatTime(shownTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Transport */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prev}
                disabled={single}
                aria-label="Previous track"
                className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full text-[var(--ink-dim)] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                <Glyph d={PREV} />
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
                className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#0b0b0b] transition-transform hover:scale-105"
              >
                <Glyph d={playing ? PAUSE : PLAY} className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={single}
                aria-label="Next track"
                className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full text-[var(--ink-dim)] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                <Glyph d={NEXT} />
              </button>
            </div>

            {track.spotify && (
              <a
                href={track.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--accent)]/50 px-4 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-hi)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1206]"
              >
                Save on Spotify
                <Glyph d={EXTERNAL} className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Queue — hidden while there's one track, since a queue of one is noise. */}
      {!single && (
        <ol className="border-t border-white/10">
          {tracks.map((t, i) => {
            const isCurrent = i === index;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => playAt(i)}
                  aria-current={isCurrent}
                  className={`flex min-h-[56px] w-full items-center gap-4 px-5 text-left transition-colors sm:px-7 ${
                    isCurrent ? "bg-white/[0.04] text-white" : "text-[var(--ink-dim)] hover:bg-white/[0.02] hover:text-white"
                  }`}
                >
                  <span className="w-4 shrink-0">
                    {isCurrent ? (
                      <Bars active={playing} />
                    ) : (
                      <span className="font-mono text-[11px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{t.title}</span>
                    <span className="block truncate text-[11px] text-[var(--ink-dim)]">{t.artists}</span>
                  </span>
                  <span className="font-mono hidden shrink-0 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)] sm:inline">
                    {t.album}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
