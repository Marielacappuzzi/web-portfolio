"use client";

import { type ReactNode, useEffect, useRef } from "react";
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
 * to come towards the reader rather than simply leaving the screen. The whole
 * travel is 10% — the brief caps scale changes at a few percent and rules out
 * parallax, and anything larger reads as an effect instead of an approach.
 *
 * The scroll handler only writes a CSS custom property, and the transform runs
 * on the compositor, so nothing here forces layout. It does nothing at all
 * under `prefers-reduced-motion`.
 */
export function ScrollZoom({
  children,
  from = 1,
  to = 1.1,
  className,
}: ScrollZoomProps) {
  const outer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const height = rect.height || 1;

      // 0 while the band sits at the top of the viewport, 1 once it has
      // travelled its own height upward.
      const progress = Math.min(1, Math.max(0, -rect.top / height));
      el.style.setProperty("--zoom", String(from + (to - from) * progress));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [from, to]);

  return (
    <div ref={outer} className={cn("overflow-hidden", className)}>
      <div
        className="origin-center will-change-transform"
        style={{ transform: "scale(var(--zoom, 1))" }}
      >
        {children}
      </div>
    </div>
  );
}
