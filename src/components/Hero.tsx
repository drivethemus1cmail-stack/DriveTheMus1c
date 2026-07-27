import EqualizerBars from "./EqualizerBars";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-20 pb-28 sm:pt-28">
      {/* converging road lines fading toward a horizon, evokes a night drive */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--asphalt) 90%), conic-gradient(from 180deg at 50% 0%, transparent 0deg, var(--cyan-glow) 2deg, transparent 4deg, transparent 40deg, var(--amber-glow) 42deg, transparent 44deg, transparent 316deg, var(--amber-glow) 318deg, transparent 320deg, transparent 356deg, var(--cyan-glow) 358deg, transparent 360deg)",
          opacity: 0.5,
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="lane-divider mb-8 w-40" />

        <h1 className="font-display text-5xl font-semibold uppercase leading-[1.05] tracking-tight text-[var(--text)] sm:text-7xl">
          Drive the music.
          <br />
          <span className="text-[var(--cyan)]">Own the sound.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-[var(--text-dim)]">
          Ready-to-use DriveTheMus1c templates built for creators who live for the road
          and the mix &mdash; drop them in and hit play.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#templates"
            className="rounded-full bg-[var(--amber)] px-7 py-3 font-display text-base font-semibold uppercase tracking-wide text-[#1a1206] shadow-[0_0_30px_var(--amber-glow)] transition-transform hover:scale-105"
          >
            Browse Templates
          </a>
          <a
            href="#about"
            className="rounded-full border border-[var(--line)] px-7 py-3 font-display text-base font-semibold uppercase tracking-wide text-[var(--text)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
          >
            How It Works
          </a>
        </div>

        <EqualizerBars className="mt-16 h-24 opacity-90" />
      </div>
    </section>
  );
}
