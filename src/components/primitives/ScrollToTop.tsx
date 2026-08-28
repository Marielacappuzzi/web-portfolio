"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { jumpToTop } from "@/lib/smooth-scroll";

/**
 * Every new page starts at its beginning.
 *
 * Next resets the scroll on navigation by itself, but not here: PageTransition
 * calls `router.push` from inside `startViewTransition`, and Lenis keeps its
 * own scroll offset independently of the native one. Between them the reader
 * arrived on the next page at whatever height they had left the last one —
 * clicking "Encargos" from the foot of the catalogue landed halfway down the
 * form.
 *
 * A hash is the exception, and the only one: someone following /obra#materia
 * asked for a specific place on the page, and SmoothScroll eases them to it.
 *
 * The first render is skipped. On a hard load the browser has already put the
 * reader where they asked to be — a restored position on a refresh, or an
 * anchor — and overriding that is its own bug.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    if (window.location.hash) return;

    jumpToTop();
  }, [pathname]);

  return null;
}
