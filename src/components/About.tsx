const STEPS = [
  { step: "01", title: "Pick a template", desc: "Browse the lineup and grab the one that matches your track's energy." },
  { step: "02", title: "Drop in your audio", desc: "Swap in your mix, cover art, and captions — everything's already timed to the beat." },
  { step: "03", title: "Hit the road", desc: "Export and post. No editing experience required, just good taste in music." },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[var(--amber)]">
            How It Works
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase text-[var(--text)] sm:text-5xl">
            Three steps, then you're cruising
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--cyan)]/40 font-display text-xl font-semibold text-[var(--cyan)]">
                {s.step}
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--text)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
