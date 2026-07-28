import MotionMark from "./MotionMark";
import AlbumBackdrop from "./AlbumBackdrop";

export default function Statement() {
  return (
    <section className="relative overflow-hidden bg-[var(--black)] px-6 py-32 text-center sm:px-10">
      <AlbumBackdrop index={0} />
      <div className="relative">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--ink-dim)]">
          Why We Built This
        </span>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl uppercase leading-tight tracking-tight text-white sm:text-5xl">
          Every producer remembers their first vocal chain. Most of us built it wrong.
        </h2>
        <MotionMark className="mx-auto mt-10 h-6 w-11" />
      </div>
    </section>
  );
}
