"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/smooth-scroll";

/**
 * Smooth scrolling, driven by Lenis on GSAP's ticker.
 *
 * Two details matter here:
 *
 *  1. Lenis and ScrollTrigger must share one clock. Left on separate loops,
 *     ScrollTrigger reads positions Lenis has not applied yet and reveals fire
 *     early or late. Lenis is driven from gsap.ticker and ScrollTrigger is
 *     told to update on every Lenis scroll, so both agree on where the page is.
 *  2. Readers who ask for reduced motion get the browser's own scrolling.
 *     Hijacking the scrollbar is exactly the kind of motion that setting is
 *     there to refuse.
 *
 * Duration is 1.2s. Longer values (the 2s Lenis suggests) read as calm in
 * isolation but make the page feel disconnected from the hand driving it.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already scroll smoothly; overriding them fights the OS.
      syncTouch: false,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // CSS smooth scrolling would compete with Lenis for the same gesture.
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    /*
      Recalculate trigger positions once the page has settled.

      Every ScrollTrigger measures where its element sits at the moment it is
      created. Two things move everything afterwards: web fonts arrive and
      reflow the text (both faces are `display: swap`), and images decode. A
      pinned section whose end was computed against the shorter page holds the
      reader in place past the point it should have released — which is the
      "stuck, cannot keep scrolling" people report, and why it repeats at
      several points down the page rather than one.

      document.fonts.ready covers the reflow; the load event covers the rest.
    */
    /*
      Same-page anchors, eased rather than jumped.

      `scroll-behavior` is `auto` because CSS smooth scrolling would fight
      Lenis for the same gesture, which leaves a bare hash link landing with a
      hard cut. Lenis scrolls to the target itself instead, on the same easing
      as the wheel, so arriving at a section feels like scrolling to it.

      The offset clears the fixed header — without it the heading you asked
      for sits underneath the navigation.
    */
    const onAnchorClick = (event: MouseEvent) => {
      // Let the browser handle modified clicks: new tab, new window, download.
      // No `defaultPrevented` check: same-page anchors are `next/link` too,
      // and Link prevents the default before this could see it.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only same-document hashes. A cross-page link is Next.js’s business.
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      const target = document.querySelector(url.hash);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      event.stopPropagation();
      lenis.scrollTo(target, { offset: -96 });

      // Keep the address bar honest without letting it jump the page.
      const oldURL = window.location.href;
      window.history.pushState(null, "", url.hash);

      /*
        And say so. `pushState` changes the URL silently — it fires no
        `hashchange` — so anything on the page listening for one never heard
        it. That is why the enquiry form's select did not preselect when the
        availability buttons were pressed: the hash was right, the scroll was
        right, and the only component that cared was never told. Arriving with
        the hash already in the URL worked, because that path reads it on
        mount, which is what made it look intermittent rather than broken.

        Dispatching the real event rather than a private one keeps this
        honest: a listener written against the platform behaves the same here
        as it would anywhere else.
      */
      window.dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL,
          newURL: window.location.href,
        }),
      );
    };

    // Capture phase, ahead of React and of Link.
    document.addEventListener("click", onAnchorClick, true);

    /*
      Arriving with a hash already in the URL — the catalogue in the menu
      links to /obra#materia from any page.

      The browser jumps to the element before Lenis exists. Start at the top
      instead and ease down, so a link from the navigation reads the same way
      as one clicked in place. It waits a frame for layout, and for fonts,
      because the target has not settled at its final position yet.
    */
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);

      if (target instanceof HTMLElement) {
        window.scrollTo(0, 0);

        const settle = () => lenis.scrollTo(target, { offset: -96 });

        if (document.fonts?.status === "loaded") {
          requestAnimationFrame(settle);
        } else {
          document.fonts?.ready.then(() => requestAnimationFrame(settle));
        }
      }
    }

    const refresh = () => ScrollTrigger.refresh();

    /*
      Lenis caches the scroll limit. Anything that changes the page height
      after mount — an accordion opening, a font landing, an image decoding —
      leaves it scrolling to a boundary that has moved, which shows up as the
      wheel stopping short of the end.
    */
    const observer = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    observer.observe(document.body);

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      setLenis(null);
      observer.disconnect();
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return null;
}
