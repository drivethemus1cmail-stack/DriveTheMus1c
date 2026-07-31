const STEPS = [
  { number: "01", title: "Get the pack", desc: "Download the FL Studio template and mixer presets — no third-party plugins required for the Base Version." },
  { number: "02", title: "Plug in your mic", desc: "Follow the Start Here Guide to route your mic, set a safe recording level, and confirm zero missing-plugin warnings." },
  { number: "03", title: "Record & release", desc: "Track your vocals, mix inside a chain that's already built, and put your song out under your own name." },
];

export default function ProcessSection() {
  return (
    <section id="mission" className="bg-[var(--off-white)] px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--charcoal)]/60">
            How It Works
          </span>
          <h2 className="mt-4 font-display text-5xl uppercase tracking-tight text-[var(--charcoal)] sm:text-6xl">
            From download to first take
          </h2>
          <p className="mt-4 text-[var(--charcoal)]/75">
            Every beginner artist loses hours to routing, missing plugins, and guessing at a
            mixer chain before they record a real vocal. DriveTheMus1c clears that out of the
            way — so newer artists spend their time making music, not troubleshooting.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.number} className="border-t border-[var(--charcoal)]/20 pt-6">
              <span className="font-display text-2xl text-[var(--accent)]">{s.number}</span>
              <h3 className="mt-2 font-display text-2xl uppercase text-[var(--charcoal)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
