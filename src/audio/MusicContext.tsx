import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

const TRACK = `${import.meta.env.BASE_URL}audio/southside-demo.mp3`;
/** Deliberately quiet — this sits under the page, it isn't the focus. */
const BASE_VOLUME = 0.12;
const FADE_MS = 1400;

type MusicApi = {
  started: boolean;
  muted: boolean;
  start: () => void;
  toggleMute: () => void;
};

const MusicContext = createContext<MusicApi | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  const start = useCallback(() => {
    if (audioRef.current) return;

    const el = new Audio(TRACK);
    el.loop = true;
    el.volume = 0;
    el.preload = "auto";
    audioRef.current = el;

    void el
      .play()
      .then(() => {
        setStarted(true);
        // fade in so the track eases under the page rather than punching in
        const startedAt = performance.now();
        const step = () => {
          const t = Math.min(1, (performance.now() - startedAt) / FADE_MS);
          el.volume = BASE_VOLUME * t;
          if (t < 1) fadeRef.current = requestAnimationFrame(step);
        };
        fadeRef.current = requestAnimationFrame(step);
      })
      .catch((err: unknown) => {
        // Autoplay refused (or the file is missing) — the page still works, just silent.
        console.warn("[DriveTheMus1c] demo track could not start:", err);
        audioRef.current = null;
      });
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  const value = useMemo<MusicApi>(
    () => ({ started, muted, start, toggleMute }),
    [started, muted, start, toggleMute],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMusic(): MusicApi {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
