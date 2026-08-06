import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once, the first time it scrolls into view.
 *
 * IntersectionObserver rather than a scroll listener, so nothing runs on the
 * main thread between frames. Unobserves immediately after firing — these are
 * one-shot reveals, not something that should replay on every scroll past.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer (or reduced motion) — show it and skip the machinery entirely.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    // Fail open, but only if the observer is genuinely dead. Some embedded
    // webviews never deliver callbacks, and a card stuck at opacity 0 is far
    // worse than a missed animation.
    //
    // The distinction matters: a working observer fires once shortly after
    // observe() even when the element ISN'T intersecting. So any callback at
    // all proves it's alive and cancels the timer. Cancelling only on
    // isIntersecting — as this did originally — meant the timer always won for
    // anything below the fold, revealing every card on load and defeating the
    // whole effect.
    const failsafe = window.setTimeout(() => setShown(true), 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(failsafe);
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(entry.target);
        }
      },
      // Fire a little before the element's edge hits the viewport, so the
      // motion is already settling by the time it's properly on screen.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return { ref, className: shown ? "reveal reveal-in" : "reveal" };
}

/** Stagger for the nth sibling in a group. Capped so long lists don't crawl. */
export function revealDelay(index: number, step = 90, max = 360) {
  return { ["--reveal-delay" as string]: `${Math.min(index * step, max)}ms` };
}
