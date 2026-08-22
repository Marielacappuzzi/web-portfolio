"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  children: ReactNode;
  /** Distance travelled, in pixels. Keep it small; this is arrival, not motion. */
  distance?: number;
  className?: string;
}

/**
 * Arrival tied to the scroll itself.
 *
 * `Reveal` fires once and plays on its own clock: the reader triggers it and
 * then watches. This one is scrubbed — the element rises and clears as the
 * reader scrolls, and stops when they stop. Scrolling back returns it. The
 * work answers the hand on the wheel rather than performing at it, which is
 * the difference between a page that feels handled and one that feels played.
 *
 * The same failure-safe contract as everywhere else applies: nothing is hidden
 * by the stylesheet, only by the code that will unhide it, and an element
 * already on screen is left alone. A failed bundle leaves the work visible.
 */
export function ScrollReveal({
  children,
  distance = 64,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already in view — never hide what the reader is looking at.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: distance },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          // From the moment the element clears the bottom edge until it has
          // risen into the lower third — settled well before centre, so it is
          // never still arriving when the reader reaches it.
          start: "top bottom",
          end: "top 65%",
          scrub: 0.6,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: "all" });
    };
  }, [distance]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
