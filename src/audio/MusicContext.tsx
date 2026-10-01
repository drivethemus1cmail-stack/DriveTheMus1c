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

/** Starts very quiet — it sits well under the page. The slider goes to 100% from here. */
const DEFAULT_VOLUME = 0.035;
const FADE_MS = 1400;

/** Fisher–Yates, returning a new array. */
function shuffled<T>(items: T[]): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const ALL = TRACKS.map((_, i) => i);

/** Play order: `current` first, the rest shuffled — or simply the list order. */
function buildOrder(current: number, shuffle: boolean): number[] {
  return shuffle ? [current, ...shuffled(ALL.filter((i) => i !== current))] : ALL.slice();
}

type MusicApi = {
  /** Has playback been started at least once this session? */
  started: boolean;
  playing: boolean;
  muted: boolean;
  volume: number;
  shuffle: boolean;
  /** The browser refused to start audio before the visitor interacted with the page. */
  blocked: boolean;
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
  toggleShuffle: () => void;
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
  const [shuffle, setShuffle] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // The play order and our place in it. SOUTHSIDE (index 0) always leads.
  const orderRef = useRef<number[]>(buildOrder(0, true));
  const posRef = useRef(0);
  const indexRef = useRef(0);
  const shuffleRef = useRef(true);

  const load = useCallback((i: number, autoplay: boolean) => {
    const el = audioRef.current;
    const t = TRACKS[i];
    if (!el || !t) return;
    el.src = trackUrl(t);
    setCurrentTime(0);
    setDuration(0);
    if (autoplay) {
      void el.play().catch((err: unknown) => {
        console.warn("[DriveTheMus1c] playback blocked:", err);
      });
    }
  }, []);

  /** Move to the track at `pos` in the play order and start it. */
  const goToPos = useCallback(
    (pos: number) => {
      posRef.current = pos;
      const i = orderRef.current[pos];
      if (i === indexRef.current) {
        // same track — restart it rather than doing nothing
        load(i, true);
      } else {
        indexRef.current = i;
        setIndex(i);
      }
    },
    [load],
  );

  const advance = useCallback(() => {
    const nextPos = posRef.current + 1;
    if (nextPos < orderRef.current.length) {
      goToPos(nextPos);
      return;
    }
    // End of the queue: wrap. Shuffle deals a fresh order, never repeating the
    // song that just finished back to back.
    if (shuffleRef.current) {
      const order = shuffled(ALL);
      if (order.length > 1 && order[0] === indexRef.current) [order[0], order[1]] = [order[1], order[0]];
      orderRef.current = order;
    }
    goToPos(0);
  }, [goToPos]);

  const advanceRef = useRef(advance);
  advanceRef.current = advance;

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
    el.addEventListener("ended", () => advanceRef.current());
    return el;
  }, []);

  // Keep the element in step with the selected track.
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) return;
    load(index, true);
  }, [index, load]);

  const waitingForGestureRef = useRef(false);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const el = ensureAudio();
    el.volume = 0;
    load(indexRef.current, false);

    void el
      .play()
      .then(() => {
        setStarted(true);
        setBlocked(false);
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
        console.warn("[DriveTheMus1c] music could not start:", err);
        startedRef.current = false;
        if (audioRef.current) audioRef.current.volume = volumeRef.current;

        // Browsers refuse sound until the visitor has interacted with the page.
        // The intro still plays; the music joins on their first click or key.
        if (err instanceof DOMException && err.name === "NotAllowedError" && !waitingForGestureRef.current) {
          waitingForGestureRef.current = true;
          setBlocked(true);
          const retry = () => {
            waitingForGestureRef.current = false;
            window.removeEventListener("pointerdown", retry, true);
            window.removeEventListener("keydown", retry, true);
            startRef.current();
          };
          window.addEventListener("pointerdown", retry, true);
          window.addEventListener("keydown", retry, true);
        }
      });
  }, [ensureAudio, load]);

  const startRef = useRef(start);
  startRef.current = start;

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
      ensureAudio();
      if (!startedRef.current) {
        startedRef.current = true;
        setStarted(true);
      }
      const pos = orderRef.current.indexOf(i);
      goToPos(pos === -1 ? 0 : pos);
    },
    [ensureAudio, goToPos],
  );

  const next = useCallback(() => {
    if (!startedRef.current) {
      start();
      return;
    }
    advance();
  }, [advance, start]);

  const prev = useCallback(() => {
    const el = audioRef.current;
    // Standard behaviour: restart before stepping back.
    if (el && el.currentTime > 3) {
      el.currentTime = 0;
      return;
    }
    const len = orderRef.current.length;
    playAt(orderRef.current[(posRef.current - 1 + len) % len]);
  }, [playAt]);

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

  const toggleShuffle = useCallback(() => {
    const nextShuffle = !shuffleRef.current;
    shuffleRef.current = nextShuffle;
    setShuffle(nextShuffle);
    // Re-deal around the current song so it keeps playing uninterrupted.
    const current = indexRef.current;
    orderRef.current = buildOrder(current, nextShuffle);
    posRef.current = orderRef.current.indexOf(current);
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
      shuffle,
      blocked,
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
      toggleShuffle,
      setVolume,
    }),
    [
      started, playing, muted, volume, shuffle, blocked, index, currentTime, duration,
      start, toggle, next, prev, playAt, seek, toggleMute, toggleShuffle, setVolume,
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
