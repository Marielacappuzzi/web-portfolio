"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

interface ScrollScaleProps {
  children: ReactNode;
  /** Scale at the top of the travel. */
  from?: number;
  /** Scale once the band has scrolled fully past. Keep it small. */
  to?: number;
  className?: string;
}

/**
 * A slow approach, scrubbed by the scroll.
 *
 * The frame around it never moves — this scales what is inside, and the parent
 * clips. A band that grew as a whole would push the page around it; the work
 * coming closer inside a fixed opening is the effect worth having.
 *
 * The travel is a few percent. The brief caps scale changes there and rules
 * out parallax, and anything larger reads as an effect rather than as an
 * approach. It does nothing under `prefers-reduced-motion`.
 */
export function ScrollScale({
  children,
  from = 1,
  to = 1.08,
  className,
}: ScrollScaleProps) {
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
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
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
    /*
      No `relative` of its own. The work cover passes `absolute inset-0`, and
      Tailwind emits both — the sheet order decides, not the attribute, so
      `relative` won and the wrapper collapsed to nothing. The image inside it
      is positioned `absolute` against that box, so it had no box to fill and
      the cover rendered empty. Positioning belongs to whoever places this.
    */
    <div ref={outer} className={cn("overflow-hidden", className)}>
      <div ref={inner} className="h-full w-full origin-center will-change-transform">
        {children}
      </div>
    </div>
  );
}
