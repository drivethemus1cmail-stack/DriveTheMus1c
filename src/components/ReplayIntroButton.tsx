const REPLAY = "M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z";

/**
 * Pinned to the page's left edge, out of the header's way. Collapsed to an icon
 * until hovered or focused, so it never competes with the content.
 */
export default function ReplayIntroButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Replay intro"
      className="group font-mono fixed bottom-6 left-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-[var(--black)]/80 px-[13px] text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)] backdrop-blur transition-colors hover:border-[var(--accent)] hover:text-white focus-visible:text-white sm:left-6"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
        <path d={REPLAY} />
      </svg>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[120px] group-focus-visible:max-w-[120px] sm:inline">
        Replay intro
      </span>
    </button>
  );
}
