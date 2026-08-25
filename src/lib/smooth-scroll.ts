"use client";

import type Lenis from "lenis";

/**
 * The page's Lenis instance, shared so overlays can pause it.
 *
 * `overflow: hidden` on the body does not stop Lenis — it moves the page with
 * a transform on its own clock rather than through the native scrollbar. A
 * modal that only sets overflow would still let the wheel drift the page
 * behind it, so overlays call `lockScroll` instead.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null): void {
  instance = next;
}

/**
 * Stops or resumes smooth scrolling. Safe to call when Lenis never started
 * (reduced motion, or before mount) — it simply does nothing.
 */
export function lockScroll(locked: boolean): void {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}

/**
 * Eases to the top of the page. Falls back to the browser when Lenis never
 * started — reduced motion, or before mount.
 */
export function scrollToTop(): void {
  if (instance) {
    instance.scrollTo(0);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
