"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WorkImage } from "@/content/types";

interface WorkGalleryProps {
  images: WorkImage[];
  /** Announced to assistive technology as the name of the run. */
  label: string;
}

/**
 * The plates, read sideways.
 *
 * The section pins while the reader keeps scrolling, and the vertical gesture
 * moves a horizontal run of plates instead of the page. It suits this work
 * specifically: every photograph in the catalogue is portrait, and portrait
 * images stacked vertically make a reader scroll past most of them. Laid side
 * by side they are read the way prints are read on a wall — one after another,
 * at the reader's own pace, with the whole run in peripheral vision.
 *
 * Two rules keep it from becoming a trick:
 *
 *  1. It never hijacks. The pin lasts exactly the width of the run, so the
 *     page resumes normal scrolling the moment the last plate lands. Nothing
 *     is captured, nothing has to be waited out.
 *  2. It degrades to a plain scroller. Under `prefers-reduced-motion`, on
 *     narrow screens, or with no JavaScript at all, the same markup is a
 *     horizontal strip the reader can swipe — which is the native gesture on
 *     a phone anyway. The pinning is an enhancement on top, never the only
 *     way in.
 */
export function WorkGallery({ images, label }: WorkGalleryProps) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = section.current;
    const rail = track.current;
    if (!root || !rail) return;

    // Two or fewer plates fit on screen at once: pinning a run that never
    // needs to travel would hold the page still for nothing.
    if (images.length < 3) return;

    // Below `md` the strip stays a swipeable scroller — pinning a short
    // viewport steals more than it gives.
    const wide = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!wide.matches || reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = () => rail.scrollWidth - rail.clientWidth;
      if (distance() <= 0) return;

      gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          // Pin for exactly as long as the run is wide, so the gesture maps
          // one to one and the section releases as the last plate arrives.
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div ref={section} className="overflow-hidden py-2xl">
      <ul
        ref={track}
        aria-label={label}
        className="gutter flex gap-lg overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image) => (
          <li
            key={image.src}
            className="w-[72vw] shrink-0 sm:w-[46vw] md:w-[30vw] lg:w-[24vw]"
          >
            <figure>
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: `${image.width} / ${image.height}` }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 72vw"
                  quality={90}
                  className="object-cover"
                />
              </div>

              {image.caption ? (
                <figcaption className="mt-sm font-sans text-xs text-fg-muted">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
