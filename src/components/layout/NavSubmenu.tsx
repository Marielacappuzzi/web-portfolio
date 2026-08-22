"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { NavChild } from "@/content/types";

interface NavSubmenuProps {
  items: NavChild[];
  /** Id of the trigger, so the panel can point back at it. */
  labelledBy: string;
  open: boolean;
}

/**
 * The panel that drops under "Obra".
 *
 * Two things make it feel drawn rather than switched:
 *
 *  · A rule runs across the top before anything else arrives, so the panel
 *    opens the way every other section of the site opens.
 *  · The titles rise in sequence, 40ms apart. Fast enough that the list reads
 *    as one gesture, slow enough that the eye registers an order.
 *
 * It is a plain list in the markup, so with no JavaScript it is simply a
 * always-visible group of links under the nav item — never a dead end.
 */
export function NavSubmenu({ items, labelledBy, open }: NavSubmenuProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Hidden only once the client is running: the server output is a plain
    // visible list, so the links exist without JavaScript.
    el.dataset.armed = "true";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(el, { autoAlpha: open ? 1 : 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (open) {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .set(el, { autoAlpha: 1 })
          .fromTo(
            "[data-submenu-rule]",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.45, transformOrigin: "left center" },
          )
          .fromTo(
            "[data-submenu-item]",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 },
            "-=0.25",
          );
      } else {
        gsap.to(el, { autoAlpha: 0, duration: 0.25, ease: "power2.out" });
      }
    }, el);

    return () => ctx.revert();
  }, [open]);

  return (
    <div
      ref={root}
      aria-labelledby={labelledBy}
      // Hidden only once the client has taken over. Before that it is a plain
      // visible list, so the links exist without JavaScript.
      className="absolute left-0 top-full z-50 w-max min-w-56 pt-4 data-[armed]:invisible data-[armed]:opacity-0"
    >
      <div className="border border-rule bg-bg px-lg py-md">
        <span
          data-submenu-rule
          aria-hidden="true"
          className="mb-md block h-px w-10 origin-left bg-fg-strong"
        />

        <ul className="flex flex-col gap-2xs">
          {items.map((child) => (
            <li key={child.href} data-submenu-item>
              <Link
                href={child.href}
                className="block font-serif text-base font-light leading-snug text-fg transition-colors duration-300 hover:text-fg-strong"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
