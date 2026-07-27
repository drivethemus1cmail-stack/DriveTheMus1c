import MotionStreaks from "./MotionStreaks";
import CarMark from "./CarMark";
import Gauge from "./Gauge";
import LevelMeter from "./LevelMeter";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28">
      <MotionStreaks className="pointer-events-none absolute inset-x-0 top-0 h-[500px] w-full" />
      <CarMark
        variant="watermark"
        className="pointer-events-none absolute -right-10 top-24 h-40 w-auto opacity-[0.06] sm:h-56"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
        style={{ background: "linear-gradient(to bottom, transparent 30%, var(--bg) 95%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="text-center lg:text-left">
            <span className="gold-divider mx-auto mb-8 block w-40 lg:mx-0" />

            <h1 className="font-display text-6xl uppercase leading-[1.05] tracking-tight text-[var(--text)] sm:text-7xl">
              Driving the music
              <br />
              <span className="text-gold-foil">forward.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-dim)] lg:mx-0">
              DriveTheMus1c builds plug-and-play FL Studio templates and mixer presets so beginner
              artists spend less time fighting their setup and more time recording. We're here to
              push newer artists forward, one session at a time.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="#included"
                className="rounded-full border border-[var(--gold)]/60 bg-[var(--gold)] px-7 py-3 font-display text-lg tracking-wide text-[#1a1206] shadow-[0_0_24px_var(--gold-glow)] transition-transform hover:scale-105"
              >
                Get the Recording Pack
              </a>
              <a
                href="#mission"
                className="rounded-full border border-[var(--line)] px-7 py-3 font-display text-lg tracking-wide text-[var(--text)] transition-colors hover:border-[var(--gold)] hover:text-gold-foil"
              >
                Our Mission
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs rounded-2xl border border-[var(--line)] bg-[var(--panel)]/80 p-6 shadow-2xl backdrop-blur">
            <Gauge />
          </div>
        </div>

        <LevelMeter className="mx-auto mt-16 h-20 w-full max-w-md opacity-90" />
      </div>
    </section>
  );
}
