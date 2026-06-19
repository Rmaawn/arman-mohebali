"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — wraps the page in a Lenis instance so the whole site scrolls
 * with weighted momentum instead of the OS's abrupt step scroll. This is the
 * single biggest lever on how the site *feels*: every section now glides in.
 *
 * Notes:
 *  - Respects `prefers-reduced-motion`: bails out entirely so the OS handles
 *    scrolling natively (no hijacking for users who asked for less motion).
 *  - Lenis drives the real `scrollTop`, so native scroll events still fire and
 *    framer-motion's `useScroll` / IntersectionObserver keep working untouched.
 *  - Intercepts in-page anchor clicks (the side Navigation + hero buttons) and
 *    routes them through `lenis.scrollTo` for a smooth, eased jump.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      // gentle ease-out so fast flicks settle softly rather than snapping
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    document.documentElement.classList.add("lenis");

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Route in-page anchor clicks through Lenis for an eased scroll.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -20, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      document.documentElement.classList.remove("lenis");
      lenis.destroy();
    };
  }, []);

  return null;
}
