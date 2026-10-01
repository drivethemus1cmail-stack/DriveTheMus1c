# DriveTheMus1c

Marketing site for the DriveTheMus1c Beginner Recording Pack — a pre-routed
FL Studio vocal template, mixer presets, and setup guide for artists who are
new to recording.

## Running it

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # production build to dist/
npm run preview  # serve the built site on :4173
```

## Going live

Set `PURCHASE_URL` in [`src/config.ts`](src/config.ts) to the storefront product
link. Every "Get the Pack" CTA picks it up automatically. While it's empty the
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
