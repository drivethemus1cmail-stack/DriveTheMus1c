import Highway from "./Highway";
import Gauge from "./Gauge";
import LevelMeter from "./LevelMeter";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28">
      <Highway className="pointer-events-none absolute inset-x-0 top-0 h-[560px] w-full opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{ background: "linear-gradient(to bottom, transparent 40%, var(--asphalt) 95%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="text-center lg:text-left">
          <span className="lane-divider mx-auto mb-8 w-40 lg:mx-0" />

          <h1 className="font-display text-5xl font-semibold uppercase leading-[1.05] tracking-tight text-[var(--text)] sm:text-6xl">
            Driving the music
            <br />
            <span className="text-[var(--sign-green)]">forward.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-dim)] lg:mx-0">
            DriveTheMus1c builds plug-and-play FL Studio templates and mixer presets so beginner
            artists spend less time fighting their setup and more time recording. We're here to
            help newer artists get on the road to making music, faster.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#included"
              className="rounded-[3px] border-2 border-[var(--reflector)]/60 bg-[var(--sign-green)] px-7 py-3 font-display text-base font-semibold uppercase tracking-wide text-white shadow-[0_0_24px_var(--sign-green-dim)] transition-transform hover:scale-105"
            >
              Get the Recording Pack
            </a>
            <a
              href="#mission"
              className="rounded-[3px] border border-[var(--line)] px-7 py-3 font-display text-base font-semibold uppercase tracking-wide text-[var(--text)] transition-colors hover:border-[var(--lane)] hover:text-[var(--lane)]"
            >
              Our Mission
            </a>
          </div>

          <LevelMeter className="mx-auto mt-14 h-20 opacity-90 lg:mx-0" />
        </div>

        <div className="mx-auto w-full max-w-xs rounded-lg border border-[var(--line)] bg-[var(--panel)]/80 p-6 shadow-2xl backdrop-blur">
          <Gauge />
        </div>
      </div>
    </section>
  );
}
