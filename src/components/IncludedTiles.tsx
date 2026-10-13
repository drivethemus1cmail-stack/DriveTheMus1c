import AlbumBackdrop from "./AlbumBackdrop";
import { buyLinkProps, PACK_NAME, PACK_PRICE } from "../config";
import Reveal from "./Reveal";

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
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-hi)]">
              Rather go DIY?
            </span>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-tight text-white sm:text-5xl">
              The {PACK_NAME}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--ink-dim)]">
              The ready-made recording template: a pre-routed FL Studio session and vocal presets
              you set up yourself. A solid start &mdash; just not tuned to your voice.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <span className="font-display block text-5xl leading-none text-accent-foil">
                {PACK_PRICE}
              </span>
              <span className="font-mono mt-1 block text-[10px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
                One-time &middot; instant download
              </span>
            </div>
            <a
              {...buyLinkProps}
              className="font-mono inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-[var(--accent)] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
            >
              Get the Preset
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile, i) => (
            <Reveal key={tile.name} index={i} className="h-full">
            <article
              className="flex h-full min-h-[200px] flex-col justify-end rounded-lg border border-white/10 p-6"
              style={{ background: tile.bg }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-hi)]">
                {tile.tag}
              </span>
              <h3 className="font-display mt-2 text-2xl uppercase text-white">{tile.name}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-dim)]">{tile.desc}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
