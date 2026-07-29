import MotionMark from "./MotionMark";
import LevelMeter from "./LevelMeter";
import { buyLinkProps } from "../config";

export default function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--black)] px-6 pb-14 pt-32 sm:px-10">
      <span className="font-mono absolute left-6 top-1/2 hidden -translate-y-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--ink-dim)] [writing-mode:vertical-rl] lg:block">
        Skip the setup
      </span>
      <span className="font-mono absolute right-6 top-1/2 hidden -translate-y-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--ink-dim)] [writing-mode:vertical-rl] lg:block">
        Get to the session
      </span>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center text-center">
        <MotionMark className="mb-8 h-8 w-14" />

        <span className="font-mono mb-6 text-xs uppercase tracking-[0.35em] text-[var(--ink-dim)]">
          Beginner Recording Pack &mdash; FL Studio
        </span>

        <h1 className="font-display text-6xl uppercase leading-[0.95] tracking-tight text-white sm:text-7xl">
          The setup used to take
          <br />
          longer than the song.
          <br />
          <span className="text-accent-foil">Not anymore.</span>
        </h1>

        <p className="mt-8 max-w-lg text-base text-[var(--ink-dim)]">
          A pre-routed FL Studio template, mixer presets, and a step-by-step guide &mdash;
          built so newer artists spend their time recording, not troubleshooting.
        </p>

        <a
          {...buyLinkProps}
          className="font-display mt-10 rounded-full bg-[var(--accent)] px-8 py-3 text-lg uppercase tracking-wide text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
        >
          Get the Pack
        </a>
      </div>

      <LevelMeter className="mx-auto mt-16 h-16 w-full max-w-sm" />
    </section>
  );
}
