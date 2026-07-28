# Album covers

Drop cover images in this folder and they appear automatically as section
backdrops — no code change needed.

- Accepted: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`
- Used in filename order, so prefix to control which section gets which:
  `01-des1.png`, `02-southside.png`, `03-w-logo.png`
- Square art around 1000×1000 is plenty; they render at low opacity under a
  dark wash, so huge files are wasted bytes.

Consumed by `src/components/AlbumBackdrop.tsx` via `import.meta.glob`.
