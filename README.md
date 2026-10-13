# DriveTheMus1c

Site for DriveTheMus1c custom vocal mixes — a vocal preset built around the
client's voice, mic and room: live on a $50 online call, from a recording they
send in ($50, no call), or in person around Santa Cruz ($150–200, with studio
setup). The Base FL Studio Preset ($50, the recording template, sold through
the existing Payhip listing) stays on the page as the DIY option.

## Running it

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # production build to dist/
npm run preview  # serve the built site on :4173
```

## Clients and sign-ups

`/start` is the sign-up page; every "Book" and "Sign up" button leads there.
Submissions go to a Google Sheet CRM through an Apps Script web app — set it up
with [docs/crm-setup.md](docs/crm-setup.md), then put the URL in `CRM_ENDPOINT`
in [`src/config.ts`](src/config.ts). Until then the form opens a pre-filled
email instead. Sessions and prices live in `SERVICES` in the same file;
booking links are in [docs/calcom-setup.md](docs/calcom-setup.md).

## The pack

Set `PURCHASE_URL` in [`src/config.ts`](src/config.ts) to the storefront product
link. The "Get the Preset" button picks it up automatically. While it's empty the
buttons scroll to the "What's in the pack" section instead of dead-ending.

## Album art

Drop images into `src/assets/covers/` — they're picked up automatically as
section backdrops via `import.meta.glob`, in filename order. No code change
needed. See [the folder README](src/assets/covers/README.md).

## The ignition intro

Every page load opens on an ignition switch (`src/components/IgnitionScreen.tsx`)
that turns itself: **ON** plays a chime and lights the dashboard, **START**
cranks the engine and begins the music, and the screen pulls away to the
landing page. The replay button in the header runs it again.

- Can be skipped at any point.
- Collapses to an instant transition under `prefers-reduced-motion`.
- Chime, detent clicks, and starter crank are synthesized with Web Audio
  (`src/audio/engineAudio.ts`) — no audio files beyond the songs.
- Browsers block sound until a visitor has interacted with the page, so on a
  first visit the intro may play silently; the music then starts on their
  first click or key press.

## Music

The player queue in [`src/config.ts`](src/config.ts) mirrors Des1's Spotify
catalogue. SOUTHSIDE always plays first; with shuffle on (the default) the rest
follow in a random order. Music starts at 5% volume and can be muted or turned
up from the header.

Songs in `public/audio/` are 128 kbps MP3 encodes of the masters — keep
compressed copies in the repo, not the WAVs. Covers in `public/art/` come from
Spotify.

## Stack

Vite · React · TypeScript · Tailwind CSS v4. Display font is Barlow Condensed,
body Barlow, labels Roboto Mono.
