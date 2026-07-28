// Any image dropped into src/assets/covers/ is picked up automatically and
// used as a section backdrop — no code change needed to add a release.
const modules = import.meta.glob("../assets/covers/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const COVERS = Object.keys(modules)
  .sort()
  .map((k) => modules[k]);

export const hasCovers = COVERS.length > 0;

/**
 * Sits behind a section at low opacity under a dark wash, so cover art reads as
 * atmosphere without dropping text contrast below AA.
 */
export default function AlbumBackdrop({ index = 0 }: { index?: number }) {
  if (!hasCovers) return null;

  const url = COVERS[index % COVERS.length];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${url}")`, opacity: 0.16, filter: "saturate(0.85)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--black) 0%, rgba(11,11,11,0.74) 40%, rgba(11,11,11,0.78) 60%, var(--black) 100%)",
        }}
      />
    </div>
  );
}
