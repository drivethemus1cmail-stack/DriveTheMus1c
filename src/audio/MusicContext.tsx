import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { TRACKS, trackUrl, type Track } from "../config";

/** Starts quiet — it sits under the page. The slider goes to 100% from here. */
const DEFAULT_VOLUME = 0.15;
const FADE_MS = 1400;

type MusicApi = {
  /** Has playback been started at least once this session? */
  started: boolean;
  playing: boolean;
  muted: boolean;
  volume: number;
  tracks: Track[];
  index: number;
  track: Track;
  currentTime: number;
  duration: number;

  /** Begin playback from the top — used by the ignition. */
  start: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  playAt: (index: number) => void;
  seek: (seconds: number) => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
};

const MusicContext = createContext<MusicApi | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  // A single <audio> element owned by the provider, so playback survives
  // route changes — navigating never restarts the music.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const volumeRef = useRef(DEFAULT_VOLUME);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const el = new Audio();
    el.preload = "metadata";
    el.volume = volumeRef.current;
    audioRef.current = el;

    el.addEventListener("timeupdate", () => setCurrentTime(el.currentTime));
    el.addEventListener("durationchange", () => setDuration(el.duration || 0));
    el.addEventListener("play", () => setPlaying(true));
    el.addEventListener("pause", () => setPlaying(false));
    el.addEventListener("ended", () => {
      // advance, wrapping back to the top of the queue
      setIndex((i) => (i + 1) % TRACKS.length);
    });
    return el;
  }, []);

  const load = useCallback(
    (i: number, autoplay: boolean) => {
      const el = ensureAudio();
      const t = TRACKS[i];
      if (!t) return;
      el.src = trackUrl(t);
      setCurrentTime(0);
      setDuration(0);
      if (autoplay) {
        void el.play().catch((err: unknown) => {
          console.warn("[DriveTheMus1c] playback blocked:", err);
        });
      }
    },
    [ensureAudio],
  );

  // Keep the element in step with the selected track.
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) return;
    load(index, true);
  }, [index, load]);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const el = ensureAudio();
    el.volume = 0;
    load(0, false);

    void el
      .play()
      .then(() => {
        setStarted(true);
        // fade in so it eases under the page rather than punching in
        const at = performance.now();
        const target = volumeRef.current;
        const step = () => {
          const t = Math.min(1, (performance.now() - at) / FADE_MS);
          if (audioRef.current) audioRef.current.volume = target * t;
          if (t < 1) fadeRef.current = requestAnimationFrame(step);
        };
        fadeRef.current = requestAnimationFrame(step);
      })
      .catch((err: unknown) => {
        console.warn("[DriveTheMus1c] demo track could not start:", err);
        startedRef.current = false;
        if (audioRef.current) audioRef.current.volume = volumeRef.current;
      });
  }, [ensureAudio, load]);

  const toggle = useCallback(() => {
    if (!startedRef.current) {
      start();
      return;
    }
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  }, [start]);

  const playAt = useCallback(
    (i: number) => {
      const clamped = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
      if (!startedRef.current) {
        startedRef.current = true;
        setStarted(true);
      }
      if (clamped === index) {
        // same track — restart it rather than doing nothing
        load(clamped, true);
      } else {
        setIndex(clamped);
      }
    },
    [index, load],
  );

  const next = useCallback(() => playAt(index + 1), [index, playAt]);
  const prev = useCallback(() => {
    const el = audioRef.current;
    // Standard behaviour: restart before stepping back.
    if (el && el.currentTime > 3) {
      el.currentTime = 0;
      return;
    }
    playAt(index - 1);
  }, [index, playAt]);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el || !Number.isFinite(el.duration)) return;
    el.currentTime = Math.max(0, Math.min(el.duration, seconds));
    setCurrentTime(el.currentTime);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prevMuted) => {
      const nextMuted = !prevMuted;
      if (audioRef.current) audioRef.current.muted = nextMuted;
      return nextMuted;
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
      if (clamped > 0 && audioRef.current.muted) {
        audioRef.current.muted = false;
        setMuted(false);
      }
    }
  }, []);

  const value = useMemo<MusicApi>(
    () => ({
      started,
      playing,
      muted,
      volume,
      tracks: TRACKS,
      index,
      track: TRACKS[index],
      currentTime,
      duration,
      start,
      toggle,
      next,
      prev,
      playAt,
      seek,
      toggleMute,
      setVolume,
    }),
    [
      started, playing, muted, volume, index, currentTime, duration,
      start, toggle, next, prev, playAt, seek, toggleMute, setVolume,
    ],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMusic(): MusicApi {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}

/** m:ss, and a dash while duration is still unknown. */
// eslint-disable-next-line react-refresh/only-export-components
export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "–:––";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
