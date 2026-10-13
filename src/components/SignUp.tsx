import { useState, type FormEvent, type ReactNode } from "react";
import MotionMark from "./MotionMark";
import AlbumBackdrop from "./AlbumBackdrop";
import { CRM_ENDPOINT, findService, isSendIn, SERVICES, SUPPORT_EMAIL, type Service } from "../config";

type Fields = {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  service: string;
  location: string;
  daw: string;
  gear: string;
  goals: string;
  reference: string;
  recordingLink: string;
  source: string;
  /** Honeypot — hidden from people, filled in by bots. */
  company: string;
};

type Status = "idle" | "sending" | "done" | "emailed" | "error";

const DAWS = ["FL Studio", "Ableton Live", "Logic Pro", "Pro Tools", "Other / not sure yet"];
const SOURCES = ["Instagram", "A friend", "YouTube", "Google", "Other"];

/** Uploads travel base64-encoded in the form post; keep them to a voice memo or a song. */
const MAX_RECORDING_MB = 15;

const LABELS: Record<keyof Fields, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  instagram: "Instagram",
  service: "Session",
  location: "Location",
  daw: "DAW",
  gear: "Mic & interface",
  goals: "What they want",
  reference: "Wants to sound like",
  recordingLink: "Recording link",
  source: "Heard about me from",
  company: "",
};

function initialFields(): Fields {
  const preselected = findService(new URLSearchParams(window.location.search).get("service"));
  return {
    name: "",
    email: "",
    phone: "",
    instagram: "",
    service: (preselected ?? SERVICES[0]).id,
    location: "",
    daw: DAWS[0],
    gear: "",
    goals: "",
    reference: "",
    recordingLink: "",
    source: "",
    company: "",
  };
}

/** The form's contents as readable lines, for the email fallback. */
function summary(fields: Fields, service: Service) {
  return (Object.keys(LABELS) as (keyof Fields)[])
    .filter((k) => k !== "company" && fields[k].trim())
    .map((k) => `${LABELS[k]}: ${k === "service" ? `${service.name} (${service.price})` : fields[k].trim()}`)
    .join("\n");
}

/** File contents as base64, without the data-URL prefix. */
function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const inputClass =
  "w-full min-h-[44px] rounded-md border border-white/15 bg-[var(--panel)] px-4 py-2.5 text-white placeholder:text-[var(--ink-dim)]/60 transition-colors focus:border-[var(--accent)] focus:outline-none";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono mb-2 block text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
        {label}
        {required && <span className="text-[var(--accent-hi)]"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-[var(--ink-dim)]/80">{hint}</span>}
    </label>
  );
}

export default function SignUp() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [status, setStatus] = useState<Status>("idle");
  const [recording, setRecording] = useState<File | null>(null);
  const [recordingError, setRecordingError] = useState("");

  const service = findService(fields.service) ?? SERVICES[0];
  const inPerson = service.id === "in-person";
  const sendIn = isSendIn(service);

  const set =
    (key: keyof Fields) =>
    (e: { target: { value: string } }) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const pickRecording = (file: File | undefined) => {
    setRecordingError("");
    if (file && file.size > MAX_RECORDING_MB * 1024 * 1024) {
      setRecording(null);
      setRecordingError(`That file is over ${MAX_RECORDING_MB} MB. Trim it down, or paste a link instead.`);
      return;
    }
    setRecording(file ?? null);
  };

  const attachNote =
    sendIn && recording ? `\n(I'm attaching my recording, ${recording.name}, to this email.)\n` : "";

  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    `Sign-up: ${service.name} — ${fields.name.trim() || "new client"}`,
  )}&body=${encodeURIComponent(`Hi, I'd like to book a session.\n\n${summary(fields, service)}\n${attachNote}`)}`;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (fields.company) {
      // A bot filled the honeypot. Look successful so it doesn't retry.
      setStatus("done");
      return;
    }

    if (sendIn && !recording && !fields.recordingLink.trim()) {
      setRecordingError("Upload a recording or paste a link to one, so I can hear how you sound.");
      return;
    }

    if (!CRM_ENDPOINT) {
      window.location.href = mailtoHref;
      setStatus("emailed");
      return;
    }

    setStatus("sending");
    try {
      // Form-encoded keeps this a "simple" request — no CORS preflight, which
      // Apps Script web apps don't answer.
      const body = new URLSearchParams({ ...fields, service: service.name });
      if (sendIn && recording) {
        body.set("recordingName", recording.name);
        body.set("recordingType", recording.type || "application/octet-stream");
        body.set("recordingData", await toBase64(recording));
      }
      const res = await fetch(CRM_ENDPOINT, { method: "POST", body });
      const data = (await res.json()) as { ok?: boolean };
      setStatus(data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="grain relative min-h-[calc(100vh-73px)] overflow-hidden bg-[var(--black)] px-6 pb-24 pt-24 sm:px-10">
      <AlbumBackdrop index={1} />

      <div className="relative mx-auto max-w-2xl">
        <div className="text-center">
          <MotionMark className="mx-auto mb-6 h-7 w-12" />
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--ink-dim)]">
            Become a client
          </span>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[1] tracking-tight text-white sm:text-6xl">
            Book a custom mix
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[var(--ink-dim)]">
            Tell me a bit about you and your setup. I read every one before we start, so the
            work starts on your sound instead of twenty questions.
          </p>
        </div>

        {status === "done" || status === "emailed" ? (
          <div className="mt-12 rounded-lg border border-[var(--accent)]/40 bg-[var(--panel)] p-8 text-center">
            <h2 className="font-display text-4xl uppercase text-white">
              {status === "done" ? "You're in." : "Almost there."}
            </h2>
            {status === "done" ? (
              service.url ? (
                <>
                  <p className="mx-auto mt-3 max-w-md text-[var(--ink-dim)]">
                    Got your details. Last step &mdash; pick a time that works for you.
                  </p>
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3 text-lg uppercase tracking-wide text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)]"
                  >
                    Pick your time
                  </a>
                </>
              ) : sendIn ? (
                <p className="mx-auto mt-3 max-w-md text-[var(--ink-dim)]">
                  Got your recording. I&rsquo;ll give it a listen and reach out within 24 hours
                  with next steps.
                </p>
              ) : (
                <p className="mx-auto mt-3 max-w-md text-[var(--ink-dim)]">
                  Got your details. I&rsquo;ll reach out within 24 hours to lock in a time
                  {inPerson ? " and confirm the price for your setup" : ""}.
                </p>
              )
            ) : (
              <p className="mx-auto mt-3 max-w-md text-[var(--ink-dim)]">
                Your email app should have opened with everything filled in &mdash;{" "}
                {sendIn ? "attach your recording and hit send" : "just hit send"}. If it didn&rsquo;t,{" "}
                <a href={mailtoHref} className="text-[var(--accent-hi)] underline underline-offset-4 hover:text-white">
                  try again
                </a>{" "}
                or email {SUPPORT_EMAIL}.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-8">
            <fieldset>
              <legend className="font-mono mb-3 block text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                How you want to work <span className="text-[var(--accent-hi)]">*</span>
              </legend>
              <div className="grid gap-3">
                {SERVICES.map((s) => {
                  const selected = s.id === service.id;
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-5 py-4 transition-colors ${
                        selected
                          ? "border-[var(--accent)] bg-[var(--accent)]/10"
                          : "border-white/15 bg-[var(--panel)] hover:border-white/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={s.id}
                        checked={selected}
                        onChange={set("service")}
                        className="sr-only"
                      />
                      <span className="min-w-0">
                        <span className="font-display block text-xl uppercase leading-tight text-white">{s.name}</span>
                        <span className="font-mono mt-1 block text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                          {s.format}
                        </span>
                      </span>
                      <span className="font-display shrink-0 text-2xl text-accent-foil">{s.price}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required>
                <input className={inputClass} value={fields.name} onChange={set("name")} required autoComplete="name" />
              </Field>
              <Field label="Email" required>
                <input
                  className={inputClass}
                  type="email"
                  value={fields.email}
                  onChange={set("email")}
                  required
                  autoComplete="email"
                />
              </Field>
              <Field
                label="Phone"
                hint={sendIn ? "Easiest way to reach you — I'll text." : "Easiest way to set a time — I'll text."}
              >
                <input className={inputClass} type="tel" value={fields.phone} onChange={set("phone")} autoComplete="tel" />
              </Field>
              <Field label="Instagram">
                <input className={inputClass} value={fields.instagram} onChange={set("instagram")} placeholder="@yourhandle" />
              </Field>
            </div>

            {sendIn && (
              <div className="space-y-5 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-5 sm:p-6">
                <div>
                  <span className="font-mono block text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                    How you sound <span className="text-[var(--accent-hi)]">*</span>
                  </span>
                  <p className="mt-1.5 text-sm text-[var(--ink-dim)]">
                    A dry vocal is best &mdash; just your voice, no effects. A voice memo or a rough
                    song works too.
                  </p>
                  <label className="mt-3 flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md border border-dashed border-white/25 bg-[var(--panel)] px-4 py-3 transition-colors hover:border-[var(--accent)]">
                    <span className="font-mono shrink-0 rounded-full border border-[var(--accent)]/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-hi)]">
                      Choose file
                    </span>
                    <span className="min-w-0 truncate text-sm text-[var(--ink-dim)]">
                      {recording ? recording.name : `MP3, WAV or M4A, up to ${MAX_RECORDING_MB} MB`}
                    </span>
                    <input
                      type="file"
                      accept="audio/*,.mp3,.wav,.m4a,.aiff,.flac"
                      className="sr-only"
                      onChange={(e) => pickRecording(e.target.files?.[0])}
                    />
                  </label>
                </div>
                <Field label="Or paste a link" hint="Google Drive, Dropbox, SoundCloud — anything I can open.">
                  <input
                    className={inputClass}
                    type="url"
                    value={fields.recordingLink}
                    onChange={set("recordingLink")}
                    placeholder="https://"
                  />
                </Field>
                {recordingError && (
                  <p role="alert" className="text-sm text-[var(--warn)]">
                    {recordingError}
                  </p>
                )}
                <Field
                  label="Who or what do you want to sound like?"
                  hint="An artist, a song, or describe it in your own words."
                  required
                >
                  <input
                    className={inputClass}
                    value={fields.reference}
                    onChange={set("reference")}
                    required
                    placeholder="e.g. bright and upfront, with a little delay"
                  />
                </Field>
              </div>
            )}

            {inPerson && (
              <Field label="Where are you?" hint="Neighbourhood or city is fine — just so I can check it's in range." required>
                <input className={inputClass} value={fields.location} onChange={set("location")} required />
              </Field>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="DAW you record in">
                <select className={inputClass} value={fields.daw} onChange={set("daw")}>
                  {DAWS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </Field>
              <Field label="Mic & interface">
                <input
                  className={inputClass}
                  value={fields.gear}
                  onChange={set("gear")}
                  placeholder="e.g. AT2020 + Scarlett Solo"
                />
              </Field>
            </div>

            <Field
              label={sendIn ? "Anything else I should know?" : "What do you want out of the session?"}
              required={!sendIn}
            >
              <textarea
                className={`${inputClass} min-h-[120px] resize-y`}
                value={fields.goals}
                onChange={set("goals")}
                required={!sendIn}
                placeholder={
                  sendIn
                    ? "What you don't like about your vocals right now, how you record, anything that helps."
                    : inPerson
                      ? "The sound you're after, and anything in the studio that isn't working."
                      : "The sound you're after, and what's not working about your vocals right now."
                }
              />
            </Field>

            {!sendIn && (
              <Field label="An artist or song whose vocal sound you like" hint="Gives us a target to dial toward.">
                <input className={inputClass} value={fields.reference} onChange={set("reference")} />
              </Field>
            )}

            <Field label="How did you hear about me?">
              <select className={inputClass} value={fields.source} onChange={set("source")}>
                <option value="">Choose one</option>
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>

            {/* Off-screen rather than display:none — some bots skip hidden fields. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Company
                <input tabIndex={-1} autoComplete="off" value={fields.company} onChange={set("company")} />
              </label>
            </div>

            {status === "error" && (
              <p role="alert" className="rounded-md border border-[var(--warn)]/50 bg-[var(--warn)]/10 p-4 text-sm text-white">
                That didn&rsquo;t go through. Try again, or{" "}
                <a href={mailtoHref} className="text-[var(--accent-hi)] underline underline-offset-4">
                  send it by email instead
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-display inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3 text-lg uppercase tracking-wide text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : `${sendIn ? "Send it in" : "Sign up"} — ${service.price}`}
            </button>

            <p className="text-center text-xs text-[var(--ink-dim)]">
              No payment yet.{" "}
              {sendIn
                ? "I'll listen first and reach out with next steps."
                : service.url
                  ? "You'll pick a time next."
                  : "I'll reach out to set a time."}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
