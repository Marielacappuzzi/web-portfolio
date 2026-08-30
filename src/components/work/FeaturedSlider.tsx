"use client";

import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/primitives/Icon";
import type { Work } from "@/content/types";
import { cn } from "@/lib/cn";

interface FeaturedSliderProps {
  works: Work[];
  /**
   * Whether the first banner is what opens the page. True on /obra, where it
   * is; false on the home, where the hero already holds that slot and this
   * run is hidden on every screen wider than a phone.
   */
  priority?: boolean;
  /**
   * Fade the top edge of each banner into the section's ground.
   *
   * Where the heading sits on the chamber ground and the photograph starts
   * immediately under it, a flat #303030 meets the top of a picture in a hard
   * line. This softens that seam. Only for a section whose ground is chamber —
   * on paper an ink fade would be a smudge. Both /obra and the home's phone
   * layout are chamber and pass it; the home's wide layout shows cards on
   * paper instead and never reaches here.
   */
  fadeTop?: boolean;
  className?: string;
}

/**
 * The three flagship pieces, one at a time, as full-width banners.
 *
 * They were a row of three cards. As cards they read as the first three items
 * of the catalogue below rather than as an opening, and each drawing got a
 * third of the width — which is the one thing a banner photograph of a work
 * hung in a room cannot survive. One at a time, edge to edge, each keeps the
 * presence it was photographed for.
 *
 * Built on scroll snapping rather than on transforms or a library. The track
 * is a real horizontal scroller with `snap-type: x mandatory`, which buys four
 * things for nothing: swipe on a phone is the browser's own gesture with its
 * own physics; the arrows are just `scrollTo({ behavior: "smooth" })`; a
 * trackpad's horizontal flick works; and with JavaScript off it degrades to a
 * strip you can still scroll. No autoplay — the reader decides when to move,
 * as asked.
 *
 * The arrows sit **below** the banner, centred, and never over it. Controls on
 * top of a photograph mean a scrim under them, and a scrim means darkening the
 * work to make room for interface — the inversion this site is built to avoid.
 * Under the frame they read as a caption line and cost the picture nothing.
 *
 * `role="group"` with `aria-roledescription` rather than a tablist: these are
 * not tabs, and announcing them as tabs makes a screen reader promise
 * navigation that does not exist.
 */
export function FeaturedSlider({
  works,
  priority = true,
  fadeTop = false,
  className,
}: FeaturedSliderProps) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => {
      const rail = track.current;
      if (!rail) return;

      const clamped = (next + works.length) % works.length;
      const slide = rail.children[clamped] as HTMLElement | undefined;
      if (!slide) return;

      /*
        `scrollTo` on the rail, not `scrollIntoView` on the slide: the latter
        also scrolls the page vertically to bring the element into view, which
        jumps the reader down every time they press an arrow.
      */
      rail.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
      setIndex(clamped);
    },
    [works.length],
  );

  /*
    Follow the rail rather than assume. A swipe, a trackpad flick or a
    keyboard scroll all move it without going through `go`, and the label
    below has to say which piece is actually on screen.
  */
  useEffect(() => {
    const rail = track.current;
    if (!rail) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = rail.clientWidth || 1;
        setIndex(Math.round(rail.scrollLeft / width));
      });
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /*
    Drag the rail with a pointer.

    Touch already had this — the track is a real scroller and a swipe is the
    browser's own gesture. A mouse had nothing: the banners looked draggable
    and were not, which is its own small broken promise. Pointer events cover
    mouse, pen and touch with one path, and touch is left to the browser
    because its native scrolling is better than anything reimplemented here.

    The `dragged` ref is what keeps a drag from also firing the link under the
    cursor: a press that travelled more than a few pixels swallows the click.
  */
  const drag = useRef<{ x: number; left: number } | null>(null);
  const dragged = useRef(false);

  const onPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType === "touch") return;
    const rail = track.current;
    if (!rail) return;

    drag.current = { x: event.clientX, left: rail.scrollLeft };
    dragged.current = false;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const rail = track.current;
    if (!rail || !drag.current) return;

    const travelled = event.clientX - drag.current.x;
    if (Math.abs(travelled) > 4) {
      dragged.current = true;
      // Only capture once it is a drag, so a plain click still reaches the link.
      rail.setPointerCapture?.(event.pointerId);
    }
    rail.scrollLeft = drag.current.left - travelled;
  };

  const endDrag = (event: React.PointerEvent<HTMLUListElement>) => {
    const rail = track.current;
    if (drag.current && rail) {
      rail.releasePointerCapture?.(event.pointerId);
      // Settle on the nearest slide rather than wherever the hand stopped.
      const width = rail.clientWidth || 1;
      go(Math.round(rail.scrollLeft / width));
    }
    drag.current = null;
  };

  if (works.length === 0) return null;

  return (
    <div
      className={cn("relative", className)}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Obras destacadas"
    >
      <ul
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(event) => {
          if (dragged.current) {
            event.preventDefault();
            event.stopPropagation();
            dragged.current = false;
          }
        }}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          // Mouse only: the cursor says the rail can be pulled.
          "cursor-grab active:cursor-grabbing",
          // The scrollbar is the one piece of chrome this cannot style.
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {works.map((work, i) => (
          <li
            key={work.slug}
            className="w-full shrink-0 snap-start"
            aria-hidden={i !== index}
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${works.length}: ${work.title}`}
          >
            <div className="relative isolate" data-ground="chamber">
              {work.banner ? (
                /*
                  Two files, chosen by the browser. 1920 x 600 is 3.2:1 and on
                  a phone that is a letterbox slot with the room in it and the
                  drawing three pixels tall, so the portrait file is composed
                  for that shape instead of cut down to it.
                */
                <picture>
                  <source
                    media="(min-width: 768px)"
                    srcSet={work.banner.src}
                  />
                  <img
                    src={work.banner.mobileSrc}
                    alt={work.banner.alt}
                    /* The first banner is what opens the page; the rest wait. */
                    loading={priority && i === 0 ? "eager" : "lazy"}
                    fetchPriority={priority && i === 0 ? "high" : "auto"}
                    decoding="async"
                    /*
                      The crop has to switch with the file. `<picture>` swaps
                      the source at `md`, but a plain `objectPosition` in the
                      style attribute does not move with it — the portrait
                      file's framing would have been applied to the landscape
                      one. Two custom properties and a breakpoint utility let
                      each file keep the position it was measured for.
                    */
                    className={cn(
                      "aspect-[960/1400] w-full object-cover md:aspect-[1920/600]",
                      "[object-position:var(--focus-movil)]",
                      "md:[object-position:var(--focus-ancho)]",
                    )}
                    style={
                      {
                        "--focus-movil":
                          work.banner.mobileFocus ?? work.banner.focus ?? "50% 50%",
                        "--focus-ancho": work.banner.focus ?? "50% 50%",
                      } as React.CSSProperties
                    }
                  />
                </picture>
              ) : null}

              {/*
                A wash rising from the foot of the frame.

                Deepened: it was ink/75 fading out over the bottom two fifths,
                which held the name but let it sit flat against a photograph
                of a lit room. Now ink/90 at the foot through ink/55 at 35%,
                over half the height — the caption reads as set into a shadow
                rather than laid on the picture, and the drawing above it is
                untouched because the gradient is gone well before it.
              */}
              {fadeTop ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent md:h-32"
                />
              ) : null}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/55 via-35% to-transparent"
              />

              {/* Name and one action, low and left, inside the picture. */}
              <div className="absolute inset-x-0 bottom-0">
                <div className="gutter mx-auto w-full max-w-wide pb-lg md:pb-xl">
                  {/*
                    A soft drop shadow under the type as well as the wash
                    behind it. The gradient handles the average; the shadow
                    handles the local case — a pale patch of wall or floor
                    passing directly under a letter.
                  */}
                  <p className="font-serif text-2xl font-light leading-tight tracking-tight text-fg-strong [text-shadow:0_1px_18px_rgb(0_0_0/0.55)] md:text-3xl">
                    {work.title}
                  </p>

                  <Link
                    href={`/obra/${work.slug}`}
                    /*
                      `tabIndex` follows the slide. A link inside a panel that
                      is scrolled off-screen is still in the tab order, and
                      tabbing to it drags the rail sideways under the reader.
                    */
                    tabIndex={i === index ? undefined : -1}
                    className={cn(
                      "group mt-sm inline-flex items-center gap-2xs py-2xs",
                      "font-sans text-2xs font-medium uppercase tracking-label",
                      "border-b border-fg-muted text-fg-strong",
                      "[text-shadow:0_1px_14px_rgb(0_0_0/0.55)]",
                      "transition-colors duration-300 hover:border-fg-strong",
                      "focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current",
                    )}
                  >
                    Ver la obra
                    <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/*
        The controls: two arrows, centred, under the frame. Nothing else — no
        dots, no thumbnails, no counter. A run of three needs none of them, and
        each one is another mark competing with the work above it.
      */}
      {works.length > 1 ? (
        <div className="mt-md flex items-center justify-center gap-lg md:mt-lg">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Obra anterior"
            className={arrowClass}
          >
            <ArrowRightIcon
              width={16}
              height={16}
              className="rotate-180 transition-transform duration-300 ease-out-quart group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </button>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Obra siguiente"
            className={arrowClass}
          >
            <ArrowRightIcon
              width={16}
              height={16}
              className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </button>
        </div>
      ) : null}

      {/* Which piece is showing, for anyone who cannot see the change. */}
      <p aria-live="polite" className="sr-only">
        {works[index]?.title}
      </p>
    </div>
  );
}

/**
 * An arrow inside a drawn square.
 *
 * It was the mark alone, on the reasoning that two controls under a full-width
 * photograph should not compete with it. They did not compete — they
 * disappeared: a 16px hairline glyph on a wide page is easy to miss entirely,
 * and a control nobody sees is worse than one that is slightly present.
 *
 * A square rather than a filled circle. The site is made of hairline frames —
 * the passepartout, the framed button — so this is the same 1px edge those
 * already use, and it firms up on hover rather than lighting up.
 */
const arrowClass = cn(
  "group flex h-11 w-11 cursor-pointer items-center justify-center",
  "border border-rule text-fg-muted",
  "transition-colors duration-300 hover:border-fg-strong hover:text-fg-strong",
  "focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current",
);
