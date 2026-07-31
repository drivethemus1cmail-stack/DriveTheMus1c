import { SERVICES, serviceLinkProps, SUPPORT_EMAIL } from "../config";

export default function Services() {
  return (
    <section id="services" className="border-t border-white/10 bg-[var(--bg-2)] px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-hi)]">
              Work With Me
            </span>
            <h2 className="mt-3 font-display text-5xl uppercase tracking-tight text-white sm:text-6xl">
              Stuck? Get on a call
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--ink-dim)]">
            The pack covers the setup. When something still won&rsquo;t work, you can book time
            with me directly instead of digging through forum threads.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between gap-6 rounded-lg border border-white/10 bg-[var(--panel)] p-7 transition-colors hover:border-[var(--accent)]/50"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl uppercase leading-tight text-white">
                    {service.name}
                  </h3>
                  <span className="font-display shrink-0 text-3xl text-accent-foil">
                    {service.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-dim)]">{service.blurb}</p>
              </div>

              <a
                {...serviceLinkProps(service)}
                className="font-mono inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-[var(--accent)]/50 px-5 text-[11px] uppercase tracking-[0.2em] text-[var(--accent-hi)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1206]"
              >
                Book this
              </a>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[var(--ink-dim)]">
          Not sure which one you need? Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[var(--accent-hi)] underline underline-offset-4 hover:text-white"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          and describe what&rsquo;s going wrong &mdash; I&rsquo;ll tell you straight if a call
          isn&rsquo;t worth it.
        </p>
      </div>
    </section>
  );
}
