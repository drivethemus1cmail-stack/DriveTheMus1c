import LevelMeter from "./LevelMeter";
import Wordmark3D from "./Wordmark3D";
import { buyLinkProps, PACK_PRICE } from "../config";

export default function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--black)] px-6 pb-14 pt-32 sm:px-10">
      <span className="font-mono absolute left-6 top-1/2 hidden -translate-y-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--ink-dim)] [writing-mode:vertical-rl] lg:block">
        Skip the setup
      </span>
      <span className="font-mono absolute right-6 top-1/2 hidden -translate-y-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--ink-dim)] [writing-mode:vertical-rl] lg:block">
        Get to the session
      </span>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center">
        {/* The wordmark is the brand statement, so it gets the top slot and the
            only motion in the hero. Falls back to the flat lockup. */}
        <Wordmark3D
          className="mb-10 h-24 w-full max-w-2xl sm:h-32"
          fallback={
            <span className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
              Drive<span className="text-accent-foil">The</span>Mus
              <span className="text-accent-foil">1</span>c
            </span>
          }
        />

        <span className="font-mono mb-5 text-xs uppercase tracking-[0.35em] text-[var(--ink-dim)]">
          FL Studio Templates &amp; Setup Help
        </span>

        <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
          Driving music{" "}
          <span className="text-accent-foil">forward.</span>
        </h1>

        <p className="mt-8 max-w-lg text-base text-[var(--ink-dim)]">
          A pre-routed FL Studio template and one-on-one setup help for artists recording
          their first songs &mdash; from someone who learned it the hard way.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            {...buyLinkProps}
            className="font-display inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3 text-lg uppercase tracking-wide text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
          >
            Get the Pack &mdash; {PACK_PRICE}
          </a>
          <a
            href="#services"
            className="font-display inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/20 px-8 py-3 text-lg uppercase tracking-wide text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-hi)]"
          >
            Book a Session
          </a>
        </div>
      </div>

      <LevelMeter className="mx-auto mt-16 h-16 w-full max-w-sm" />
    </section>
  );
}
