type Template = {
  name: string;
  tag: string;
  desc: string;
};

const TEMPLATES: Template[] = [
  { name: "Night Drive", tag: "Reels / Shorts", desc: "Neon dashboard glow with a synced EQ overlay for late-night edits." },
  { name: "Highway EQ", tag: "YouTube Intro", desc: "Speedometer wipe transitions timed to the beat drop." },
  { name: "Open Road", tag: "Podcast Visualizer", desc: "Wide-format waveform with a receding horizon backdrop." },
  { name: "Backseat Mix", tag: "TikTok", desc: "Quick-cut cassette and radio-dial motifs for lo-fi sets." },
  { name: "Redline", tag: "Album Cover Pack", desc: "High-contrast tachometer graphics for hard-hitting drops." },
  { name: "Cruise Control", tag: "Story Pack", desc: "Soft gradient sunset road loop for chill playlists." },
];

export default function Templates() {
  return (
    <section id="templates" className="border-t border-[var(--line)] bg-[var(--asphalt-2)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[var(--cyan)]">
            The Lineup
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase text-[var(--text)] sm:text-5xl">
            Templates built for the drive
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <article
              key={t.name}
              className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 transition-colors hover:border-[var(--amber)]/60"
            >
              <div className="road-lines absolute inset-x-0 top-0 h-16 -translate-y-6" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-[var(--amber)]">
                {t.tag}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--text)]">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{t.desc}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--cyan)] opacity-0 transition-opacity group-hover:opacity-100"
              >
                View template &rarr;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
