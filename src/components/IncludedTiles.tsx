import AlbumBackdrop from "./AlbumBackdrop";

type Tile = {
  tag: string;
  name: string;
  desc: string;
  bg: string;
};

const TILES: Tile[] = [
  {
    tag: "Base Version",
    name: "FL Studio Template",
    desc: "The full Mic → Main Input → Main Vocal → Master signal chain, already built and routed with stock-plugin EQ, compression, de-essing, and sends.",
    bg: "radial-gradient(140% 100% at 15% 100%, rgba(201,151,74,0.28), transparent 60%), var(--charcoal)",
  },
  {
    tag: "Preset Pack",
    name: "Mixer Presets",
    desc: "Drag-and-drop .fst presets for Main Vocals, Doubles, and Ad-libs. Drop one onto a blank mixer insert and you're ready to record.",
    bg: "linear-gradient(135deg, rgba(201,151,74,0.22), transparent 60%), var(--charcoal)",
  },
  {
    tag: "PDF Guide",
    name: "Start Here Guide",
    desc: "A step-by-step walkthrough of installing, routing, safe recording levels, and troubleshooting — for artists who've never touched a mixer.",
    bg: "radial-gradient(120% 90% at 85% 0%, rgba(201,151,74,0.24), transparent 55%), var(--charcoal)",
  },
  {
    tag: "Commercial Use",
    name: "Usage License",
    desc: "Record, release, and monetize on Spotify, Apple Music, YouTube, and more. Use it on your own sessions or paid client work.",
    bg: "linear-gradient(200deg, rgba(201,151,74,0.2), transparent 65%), var(--charcoal)",
  },
];

export default function IncludedTiles() {
  return (
    <section id="included" className="relative overflow-hidden bg-[var(--black)] px-6 py-28 sm:px-10">
      <AlbumBackdrop index={1} />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-5xl uppercase tracking-tight text-white sm:text-6xl">
            What's in the pack
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]">
            Beginner Recording Pack v1.0
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {TILES.map((tile) => (
            <article
              key={tile.name}
              className="flex min-h-[260px] flex-col justify-end rounded-lg border border-white/10 p-7"
              style={{ background: tile.bg }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-hi)]">
                {tile.tag}
              </span>
              <h3 className="font-display mt-2 text-3xl uppercase text-white">{tile.name}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-dim)]">{tile.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
