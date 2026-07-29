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

First visit opens on an ignition switch (`src/components/IgnitionScreen.tsx`).
Turning the key to **ON** plays a chime and lights the dashboard; **START**
cranks the engine, begins the demo track, and the screen pulls away to the
landing page.

- Shows once per session (`sessionStorage`), and can be skipped.
- Collapses to an instant transition under `prefers-reduced-motion`.
- Chime, detent clicks, and starter crank are synthesized with Web Audio
  (`src/audio/engineAudio.ts`) — no audio files beyond the demo track.
- The demo track plays quietly and can be muted from the header at any time.

## Audio asset

`public/audio/southside-demo.mp3` is a 128 kbps encode of the pack's demo
track. The source is a 42.8 MB 32-bit float WAV; keep the compressed copy in
the repo rather than the original.

## Stack

Vite · React · TypeScript · Tailwind CSS v4. Display font is Barlow Condensed,
body Barlow, labels Roboto Mono.
