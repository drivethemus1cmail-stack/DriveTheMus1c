import RoadSign from "./RoadSign";
import MileMarker from "./MileMarker";

const STEPS = [
  { number: "01", title: "Get the pack", desc: "Download the FL Studio template and mixer presets — no third-party plugins required for the Base Version." },
  { number: "02", title: "Plug in your mic", desc: "Follow the Start Here Guide to route your mic, set a safe recording level, and confirm zero missing-plugin warnings." },
  { number: "03", title: "Record & release", desc: "Track your vocals, mix inside a chain that's already built, and put your song out under your own name." },
];

export default function Mission() {
  return (
    <section id="mission" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <RoadSign>Our Mission</RoadSign>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold uppercase text-[var(--text)] sm:text-5xl">
            Driving music forward
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-dim)]">
            Every beginner artist loses hours to routing, missing plugins, and guessing at a
            mixer chain before they ever get to record a real vocal. DriveTheMus1c exists to
            clear that stretch of road &mdash; so newer artists spend their time making music,
            not troubleshooting their setup.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.number} className="text-center">
              <MileMarker number={s.number} />
              <h3 className="font-display text-xl font-semibold text-[var(--text)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
