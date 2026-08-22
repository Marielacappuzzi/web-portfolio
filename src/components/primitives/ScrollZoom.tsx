"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

interface ScrollZoomProps {
  children: ReactNode;
  /** Scale at the top of the travel. */
  from?: number;
  /** Scale once the element has scrolled fully past. Keep it small. */
  to?: number;
  className?: string;
}

/**
 * A very slow approach.
 *
 * As the band scrolls away, the image scales up a little, so the animal seems
 * to come towards the reader rather than simply leaving the screen. The travel
 * is a few percent — the brief caps scale changes there and rules out
 * parallax, and anything larger reads as an effect instead of an approach.
 *
 * Scrubbed by ScrollTrigger rather than a scroll listener: Lenis moves the
 * page on its own clock, so the native scroll event lags behind where the
 * page actually is. ScrollTrigger shares that clock (see SmoothScroll), which
 * keeps the zoom locked to the scroll position. It does nothing at all under
 * `prefers-reduced-motion`.
 */
export function ScrollZoom({
  children,
  from = 1,
  to = 1.06,
  className,
}: ScrollZoomProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    const target = inner.current;
    if (!el || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      target,
      { scale: from },
      {
        scale: to,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          // From the band sitting at the top of the viewport until it has
          // travelled its own height upward.
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(target, { clearProps: "all" });
    };
  }, [from, to]);

  return (
    <div ref={outer} className={cn("overflow-hidden", className)}>
      <div ref={inner} className="origin-center will-change-transform">
        {children}
      </div>
    </div>
  );
}
