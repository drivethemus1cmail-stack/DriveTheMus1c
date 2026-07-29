import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

const TRACK = `${import.meta.env.BASE_URL}audio/southside-demo.mp3`;
/** Starts quiet — it sits under the page. The slider goes to 100% from here. */
const DEFAULT_VOLUME = 0.15;
const FADE_MS = 1400;

type MusicApi = {
  started: boolean;
  muted: boolean;
  volume: number;
  start: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
};

const MusicContext = createContext<MusicApi | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const volumeRef = useRef(DEFAULT_VOLUME);

  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

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
        // fade in to the current setting rather than punching in at full level
        const startedAt = performance.now();
        const target = volumeRef.current;
        const step = () => {
          const t = Math.min(1, (performance.now() - startedAt) / FADE_MS);
          if (audioRef.current) audioRef.current.volume = target * t;
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

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    volumeRef.current = clamped;
    setVolumeState(clamped);

    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      // dragging the slider up is an obvious "I want to hear this"
      if (clamped > 0 && audioRef.current.muted) {
        audioRef.current.muted = false;
        setMuted(false);
      }
    }
  }, []);

  const value = useMemo<MusicApi>(
    () => ({ started, muted, volume, start, toggleMute, setVolume }),
    [started, muted, volume, start, toggleMute, setVolume],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMusic(): MusicApi {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
