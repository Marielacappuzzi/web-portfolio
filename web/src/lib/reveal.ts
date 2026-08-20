"use client";

/**
 * Scroll reveals, built so they cannot fail closed.
 *
 * This is an art portfolio, so the rule is absolute: a broken animation must
 * never leave the work invisible. Three defences, in order:
 *
 *  1. Nothing is hidden by the stylesheet. The hidden state ("armed") is set
 *     here, by the same code that removes it. No JavaScript, a failed bundle
 *     or a hydration error all end with the work visible.
 *  2. Elements already on screen are never armed — arming after first paint
 *     would flash, and an element the reader is looking at must not vanish.
 *  3. A scroll and resize sweep backs up the IntersectionObserver. It uses a
 *     completely different mechanism (getBoundingClientRect), so a reveal that
 *     the observer misses still lands. This is not paranoia: a `clip-path` in
 *     the armed state once zeroed the very area the observer measures, and
 *     every armed image stayed hidden for good.
 *
 * The sweep detaches itself as soon as nothing is left armed, so the cost is
 * a handful of rect reads during the first screens of a page and then nothing.
 */

export type RevealAttribute =
  | "data-reveal"
  | "data-reveal-image"
  | "data-reveal-rule";

const armed = new Map<HTMLElement, RevealAttribute>();

let observer: IntersectionObserver | null = null;
let sweepScheduled = false;
let listening = false;

/** True when any part of the element is within the viewport right now. */
function isOnScreen(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  const width = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.top < height && rect.bottom > 0 && rect.left < width && rect.right > 0
  );
}

function show(el: HTMLElement): void {
  const attr = armed.get(el);
  if (!attr) return;

  el.setAttribute(attr, "shown");
  armed.delete(el);
  observer?.unobserve(el);

  if (armed.size === 0) stopListening();
}

function sweep(): void {
  sweepScheduled = false;
  for (const el of [...armed.keys()]) {
    if (isOnScreen(el)) show(el);
  }
}

function scheduleSweep(): void {
  if (sweepScheduled) return;
  sweepScheduled = true;
  requestAnimationFrame(sweep);
}

function startListening(): void {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", scheduleSweep, { passive: true });
  window.addEventListener("resize", scheduleSweep, { passive: true });
}

function stopListening(): void {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", scheduleSweep);
  window.removeEventListener("resize", scheduleSweep);
}

function getObserver(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target as HTMLElement);
      }
    },
    {
      // Start a little before the element is fully in view so the motion
      // finishes as the reader arrives, rather than after.
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.01,
    },
  );

  return observer;
}

export function observeReveal(el: HTMLElement, attr: RevealAttribute): void {
  // Visible now — leave it visible. No animation is worth a blank screen.
  if (isOnScreen(el)) return;

  armed.set(el, attr);
  el.setAttribute(attr, "armed");

  getObserver().observe(el);
  startListening();
}
