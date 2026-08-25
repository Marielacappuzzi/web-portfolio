"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * A crossfade between routes.
 *
 * Navigation replaced the whole screen at once, which reads as a hard edit on a
 * site whose manner is otherwise unhurried. The animation itself is CSS, in
 * globals.css, so its timing sits with the rest of the motion.
 *
 * Two things had to be true for this to work at all:
 *
 *  1. The transition must start *before* the route changes. The API captures
 *     the current frame, runs the callback, then crosses that capture with what
 *     follows. Starting it after navigation captures the new page twice and
 *     fades nothing into itself.
 *
 *  2. It has to run before `next/link`. Link calls `preventDefault()` and
 *     navigates itself, and React's handler fires before a listener bubbling to
 *     `document` — so an earlier version of this file, which bailed out on
 *     `defaultPrevented`, never ran once. Listening in the capture phase puts
 *     this ahead of React, and `stopPropagation` keeps Link from navigating a
 *     second time.
 *
 * React's `<ViewTransition>` would be tidier, but it is not in React 19.2
 * stable — only in the canary builds Next's guide assumes. The browser API
 * needs no canary and degrades on its own: a browser without support navigates
 * exactly as before, and so does a reader who asked for reduced motion.
 */
export function PageTransition() {
  const router = useRouter();

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.startViewTransition) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (event: MouseEvent) => {
      // Leave modified clicks alone: new tab, new window, download.
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

      // Same page: SmoothScroll eases the hash, and a transition here would
      // capture a frame nothing is going to replace.
      if (url.pathname === window.location.pathname) return;

      // Ahead of Link's own handler, and instead of it.
      event.preventDefault();
      event.stopPropagation();

      document.startViewTransition(() => {
        router.push(url.pathname + url.search + url.hash);

        /*
          Resolve when the DOM has actually changed, not on the next frame.

          `router.push` only schedules the navigation — it returns void, and
          Next has not rendered the new route by the time the next frame
          runs. Resolving there left the browser holding the captured frame,
          waiting for a mutation that had not happened yet, until it gave up:
          `TimeoutError: Transition was aborted because of timeout in DOM
          update`, on every navigation, and a page that felt stalled.

          A MutationObserver on <main> resolves on the first real change. The
          timeout is a floor, not the mechanism: if a route is genuinely slow
          the fade ends and the page arrives when it arrives, rather than the
          reader watching a frozen frame.
        */
        return new Promise<void>((resolve) => {
          const main = document.querySelector("main");
          if (!main) {
            resolve();
            return;
          }

          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            observer.disconnect();
            clearTimeout(timer);
            resolve();
          };

          const observer = new MutationObserver(finish);
          observer.observe(main, { childList: true, subtree: true });

          const timer = setTimeout(finish, 400);
        });
      });
    };

    // Capture phase: this runs before React sees the click.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
