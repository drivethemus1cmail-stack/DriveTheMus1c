import AlbumBackdrop from "./AlbumBackdrop";

export default function RightsSection() {
  return (
    <section id="rights" className="relative overflow-hidden bg-[var(--black)] px-6 py-24 text-center sm:px-10">
      <AlbumBackdrop index={2} />
      <div className="relative">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--ink-dim)]">
          Your Rights
        </span>
        <p className="mx-auto mt-6 max-w-2xl font-display text-2xl uppercase leading-snug tracking-tight text-white sm:text-3xl">
          Record it, release it, get paid for it &mdash; no royalties owed to us, ever.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--ink-dim)]">
          The custom preset we build is yours. Release commercially, monetize on Spotify, Apple
          Music, YouTube, and SoundCloud, and use it on paid client sessions. The same goes for
          the Base FL Studio Preset &mdash; you just can't resell or redistribute its original
          template and preset files.
        </p>
      </div>
    </section>
  );
}
