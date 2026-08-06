import { buyLinkProps } from "../config";
import { Link, useRouter } from "../router";
import VolumeControl from "./VolumeControl";
import Wordmark3D from "./Wordmark3D";

const SESSION_DATE = new Date()
  .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
  .toUpperCase();

const NAV_SECTIONS = [
  { id: "included", label: "The Pack" },
  { id: "services", label: "Services" },
];

export default function TopBar() {
  const { path, navigate } = useRouter();

  /**
   * Section links live on the home page. From /music, route home first and then
   * scroll — a plain hash link would full-page reload and stop the music.
   */
  const goToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    if (path !== "/") {
      navigate("/");
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    } else {
      scroll();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--black)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-y-3 px-6 py-3 sm:px-10">
        <Link
          to="/"
          className="mr-auto inline-flex min-h-[44px] items-center"
          aria-label="DriveTheMus1c — home"
        >
          <Wordmark3D
            motion="sway"
            exposure={2.1}
            fov={20}
            className="h-[34px] w-[186px] sm:h-[38px] sm:w-[210px]"
            fallback={
              <span className="font-display text-lg uppercase tracking-wide text-white sm:text-xl">
                Drive<span className="text-accent-foil">The</span>Mus
                <span className="text-accent-foil">1</span>c
              </span>
            }
          />
        </Link>

        <span className="font-mono mr-auto hidden text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] lg:block">
          {SESSION_DATE} &middot; Beginner Recording Pack &middot; v1.0
        </span>

        <nav className="flex items-center gap-3 sm:gap-6">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              onClick={(e) => goToSection(e, s.id)}
              className="font-mono hidden min-h-[44px] items-center whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-[var(--ink-dim)] transition-colors hover:text-white md:inline-flex"
            >
              {s.label}
            </a>
          ))}

          <Link
            to="/music"
            className={`font-mono inline-flex min-h-[44px] items-center whitespace-nowrap text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-white ${
              path === "/music" ? "text-[var(--accent-hi)]" : "text-[var(--ink-dim)]"
            }`}
          >
            My Music
          </Link>

          <a
            {...buyLinkProps}
            className="font-mono inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-[var(--accent)] px-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1206] transition-colors hover:bg-[var(--accent-hi)] sm:px-5"
          >
            Get the Pack
          </a>
        </nav>

        {/* Own row on mobile so the slider isn't crushed; inline on wider screens. */}
        <div className="order-last flex w-full justify-center sm:order-none sm:ml-6 sm:w-auto">
          <VolumeControl />
        </div>
      </div>
    </header>
  );
}
