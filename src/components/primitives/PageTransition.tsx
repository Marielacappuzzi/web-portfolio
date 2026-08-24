"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * A crossfade between routes.
 *
 * Navigation replaced the whole screen at once, which reads as a hard cut on a
 * site whose manner is otherwise unhurried. The animation itself is CSS, in
 * globals.css, so its timing sits with the rest of the motion.
 *
 * The transition has to start *before* the route changes: the API captures the
 * current frame, runs the callback, then crosses that capture with whatever is
 * on screen afterwards. Running it after navigation would capture the new page
 * twice and fade nothing into itself. So the click is intercepted here and the
 * navigation happens inside the callback.
 *
 * React's `<ViewTransition>` would be tidier, but it is not in React 19.2
 * stable — only in the canary builds Next's guide assumes. Driving the browser
 * API directly needs no canary and degrades on its own: a browser without
 * support navigates exactly as before, and so does a reader who asked for
 * reduced motion.
 */
export function PageTransition() {
  const router = useRouter();

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.startViewTransition) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (event: MouseEvent) => {
      // Leave modified clicks alone: new tab, new window, download.
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // Same page: SmoothScroll handles the hash, and a transition would
      // capture a frame nothing is going to replace.
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();

      document.startViewTransition(() => {
        router.push(url.pathname + url.search + url.hash);

        // Resolve on the next frame so the browser has something new to cross
        // to. Waiting for the route to finish would hold the fade open for as
        // long as the page took, which is the opposite of unhurried.
        return new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
