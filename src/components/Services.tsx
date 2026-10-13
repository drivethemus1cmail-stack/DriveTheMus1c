import { isSendIn, SERVICES, signupPath, SUPPORT_EMAIL } from "../config";
import { Link } from "../router";
import Reveal from "./Reveal";

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
              Your vocal mix, built for you
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--ink-dim)]">
            A template is built for everyone, so it fits nobody exactly. I build the chain around
            your voice &mdash; live on a call, from a recording you send in, or in your studio.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} index={i} className="h-full">
              <article className="flex h-full flex-col justify-between gap-8 rounded-lg border border-white/10 bg-[var(--panel)] p-7 transition-colors hover:border-[var(--accent)]/50 sm:p-9">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl uppercase leading-tight text-white">{service.name}</h3>
                    <span className="font-display shrink-0 text-4xl text-accent-foil">{service.price}</span>
                  </div>
                  <span className="font-mono mt-1 block text-[11px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
                    {service.format}
                  </span>
                  <p className="mt-4 leading-relaxed text-[var(--ink-dim)]">{service.blurb}</p>
                  <ul className="mt-6 space-y-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-white">
                        <span aria-hidden="true" className="text-[var(--accent-hi)]">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={signupPath(service)}
                  className="font-mono inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
                >
                  {isSendIn(service) ? "Send it in" : "Sign up"}
                </Link>
              </article>
            </Reveal>
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
          and tell me about your setup &mdash; I&rsquo;ll point you to the right one.
        </p>
      </div>
    </section>
  );
}
