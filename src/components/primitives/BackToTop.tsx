"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/primitives/Icon";
import { scrollToTop } from "@/lib/smooth-scroll";
import { cn } from "@/lib/cn";

/**
 * Returns to the top of a long page.
 *
 * Only for the legal pages, where the reader is scrolling through a wall of
 * text with nothing to look at on the way back. Everywhere else the site is
 * short enough, and a button pinned to the corner is exactly the interface
 * furniture the rest of the design does without.
 *
 * It appears after two screens rather than immediately: before that the top of
 * the page is still a flick away and the button would only be in the way.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lenis owns the scroll, so ask it rather than jumping past it.
  const toTop = () => scrollToTop();

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Volver arriba"
      className={cn(
        "fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center",
        "border border-field bg-bg text-fg-strong",
        "transition-all duration-500 ease-out-quart",
        "hover:border-fg-strong",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUpIcon />
    </button>
  );
}
