import RoadSign from "./RoadSign";

type Item = {
  tag: string;
  name: string;
  desc: string;
};

const ITEMS: Item[] = [
  {
    tag: "Base Version",
    name: "FL Studio Template",
    desc: "The full Mic → Main Input → Main Vocal → Master signal chain, already built and routed — EQ, compression, de-essing, and reverb/delay sends in place using stock plugins.",
  },
  {
    tag: "Preset Pack",
    name: "Mixer Presets",
    desc: "Drag-and-drop .fst presets for Main Vocals, Doubles, and Ad-libs. Drop one onto a blank mixer insert and you're ready to record.",
  },
  {
    tag: "PDF Guide",
    name: "Start Here Guide",
    desc: "A step-by-step walkthrough of installing, routing, setting safe recording levels, and troubleshooting — written for artists who've never touched a mixer before.",
  },
  {
    tag: "Commercial Use",
    name: "Usage License",
    desc: "Record, release, and monetize on Spotify, Apple Music, YouTube, and more. Use the pack on your own sessions or paid client work.",
  },
];

export default function WhatsIncluded() {
  return (
    <section id="included" className="border-t border-[var(--line)] bg-[var(--asphalt-2)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <RoadSign>Beginner Recording Pack</RoadSign>
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase text-[var(--text)] sm:text-5xl">
            What's in the pack
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <article
              key={item.name}
              className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6"
            >
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-[var(--lane)]">
                {item.tag}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--text)]">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{item.desc}</p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[var(--text-dim)]">
          The Base Version runs entirely on stock FL Studio plugins &mdash; no extra purchases
          required. Enhanced Versions add extra templates, effect chains, and presets for artists
          ready to go further.
        </p>
      </div>
    </section>
  );
}
