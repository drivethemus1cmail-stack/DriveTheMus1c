const STEPS = [
  { number: "01", title: "Sign up", desc: "Tell me about your voice, your gear, and the sound you're chasing. No call? Send a recording instead. No payment yet." },
  { number: "02", title: "Build it", desc: "On a call, in your studio, or from your recording, your vocal chain gets built from scratch and tuned to how you sound." },
  { number: "03", title: "Keep it", desc: "The preset is saved to your setup. Load it on every session and record with your sound from the first take." },
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
            From sign-up to your sound
          </h2>
          <p className="mt-4 text-[var(--charcoal)]/75">
            Every artist loses hours guessing at a vocal chain that was built for someone
            else&rsquo;s voice. DriveTheMus1c builds yours with you &mdash; so you spend your time
            making music, not troubleshooting.
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
