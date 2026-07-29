import { useMusic } from "../audio/MusicContext";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function SpeakerIcon({ silent }: { silent: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
      {silent ? (
        <path d="M17 9.5l4.5 5M21.5 9.5l-4.5 5" strokeLinecap="round" />
      ) : (
        <>
          <path d="M16.5 8.8a4.5 4.5 0 0 1 0 6.4" strokeLinecap="round" />
          <path d="M19.5 6.2a8.5 8.5 0 0 1 0 11.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/** Three bars that animate while audio is audible — makes the source obvious. */
function PlayingBars({ active }: { active: boolean }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={active ? "meter-bar w-[3px] rounded-[1px]" : "w-[3px] rounded-[1px]"}
          style={{
            height: active ? `${[60, 100, 45][i]}%` : "30%",
            background: active ? "var(--accent-hi)" : "var(--ink-dim)",
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
    </span>
  );
}

export default function VolumeControl() {
  const { started, muted, volume, start, toggleMute, setVolume } = useMusic();

  const audible = started && !muted && volume > 0;
  const pct = Math.round(volume * 100);

  // Returning visitors skip the ignition, so the track was never started —
  // the same control doubles as play so the music is always reachable.
  const label = !started ? "Play demo track" : muted ? "Unmute demo track" : "Mute demo track";

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
      <PlayingBars active={audible} />

      <button
        type="button"
        onClick={started ? toggleMute : start}
        aria-pressed={started ? muted : undefined}
        aria-label={label}
        title={label}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[var(--text)] transition-colors hover:text-[var(--accent-hi)]"
      >
        {started ? <SpeakerIcon silent={!audible} /> : <PlayIcon />}
      </button>

      <label className="flex items-center gap-2">
        <span className="sr-only">Demo track volume</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          onChange={(e) => setVolume(Number(e.target.value) / 100)}
          aria-label="Demo track volume"
          aria-valuetext={`${pct} percent`}
          className="volume-slider w-24 sm:w-28"
          style={{ ["--fill" as string]: `${pct}%` }}
        />
      </label>

      <span className="font-mono hidden w-8 text-right text-[10px] tabular-nums text-[var(--ink-dim)] sm:inline">
        {!started ? "off" : muted ? "—" : pct}
      </span>
    </div>
  );
}
