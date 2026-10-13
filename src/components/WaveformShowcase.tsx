const BAR_COUNT = 90;

function barHeight(i: number) {
  const wave = Math.sin(i * 0.45) * 0.5 + Math.sin(i * 0.13) * 0.3 + Math.sin(i * 0.9) * 0.2;
  return 18 + Math.abs(wave) * 70;
}

const CARDS = [
  {
    title: "Tuned to your voice",
    body: "EQ, compression, de-essing, and space set while you sing into it — not guessed from someone else's vocal.",
  },
  {
    title: "Your mic, your room",
    body: "A chain dialed for the gear you actually own and the space you actually record in.",
  },
  {
    title: "Yours to keep",
    body: "Saved as a preset in your DAW, so every session after starts with your sound already loaded.",
  },
];

export default function WaveformShowcase() {
  return (
    <section className="relative overflow-hidden bg-[var(--charcoal)] px-6 py-28 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[70%] items-end justify-between gap-[2px] px-4 opacity-25">
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-[1px]"
            style={{ height: `${barHeight(i)}%`, background: "var(--accent)" }}
          />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, var(--charcoal) 0%, transparent 35%, var(--charcoal) 92%)" }}
      />

      <div className="relative mx-auto grid max-w-[1600px] gap-8 sm:grid-cols-3">
        {CARDS.map((card) => (
          <div key={card.title} className="rounded-md border border-white/10 bg-[var(--black)]/70 p-6 backdrop-blur-sm">
            <h3 className="font-display text-2xl uppercase text-white">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-dim)]">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
