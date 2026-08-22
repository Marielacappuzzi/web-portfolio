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

    return () => {
      setLenis(null);
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return null;
}
