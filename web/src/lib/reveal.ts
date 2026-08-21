"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll reveals, built so they cannot fail closed.
 *
 * This is an art portfolio, so the rule is absolute: a broken animation must
 * never leave the work invisible. Three defences, in order:
 *
 *  1. Nothing is hidden by the stylesheet. The hidden state is set here, by
 *     the same code that removes it. No JavaScript, a failed bundle or a
 *     hydration error all end with the work visible.
 *  2. Elements already on screen are never armed — arming after first paint
 *     would flash, and an element the reader is looking at must not vanish.
 *  3. Every reveal plays once and stays played. Nothing re-hides on the way
 *     back up, so scrubbing the page never makes the work flicker.
 *
 * GSAP drives the motion; ScrollTrigger decides when. Transforms stay off the
 * `filter` property on purpose: blurring charcoal work washes it out, and the
 * brief is explicit that the technique must never shout louder than the work.
 */

export type RevealAttribute =
  | "data-reveal"
  | "data-reveal-image"
  | "data-reveal-rule";

/** Motion for each variant: where it starts, and how it settles. */
const VARIANTS: Record<
  RevealAttribute,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  // Text and general blocks — a short rise out of the page.
  "data-reveal": {
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
  },
  // The work emerges rather than appears: a slow fade off a 3% settle.
  "data-reveal-image": {
    from: { opacity: 0, scale: 1.03 },
    to: { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
  },
  // The first stroke, drawn left to right.
  "data-reveal-rule": {
    from: { scaleX: 0, transformOrigin: "left center" },
    to: { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
  },
};

let registered = false;

function ensureRegistered(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** True when any part of the element is within the viewport right now. */
function isOnScreen(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  const width = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.top < height && rect.bottom > 0 && rect.left < width && rect.right > 0
  );
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Arms an element and reveals it once it scrolls into view.
 *
 * Returns a cleanup function that kills the trigger and clears any inline
 * state GSAP left behind, so a component unmounting mid-animation cannot
 * strand the element in a half-hidden state.
 */
export function observeReveal(
  el: HTMLElement,
  attr: RevealAttribute,
  delayMs = 0,
): () => void {
  // Reduced motion: no arming, no tween. The content is simply there.
  if (prefersReducedMotion()) return () => {};

  // Visible now — leave it visible. No animation is worth a blank screen.
  if (isOnScreen(el)) return () => {};

  ensureRegistered();

  const { from, to } = VARIANTS[attr];

  const tween = gsap.fromTo(el, from, {
    ...to,
    delay: delayMs / 1000,
    paused: true,
    // Clear inline styles once settled so the element goes back to being
    // governed by the stylesheet alone.
    onComplete: () => gsap.set(el, { clearProps: "all" }),
  });

  const trigger = ScrollTrigger.create({
    trigger: el,
    // Start a little before the element is fully in view so the motion
    // finishes as the reader arrives, rather than after.
    start: "top 90%",
    once: true,
    onEnter: () => tween.play(),
  });

  return () => {
    trigger.kill();
    tween.kill();
    gsap.set(el, { clearProps: "all" });
  };
}
