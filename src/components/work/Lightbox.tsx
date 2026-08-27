"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/primitives/Icon";
import { WorkSpecs } from "./WorkMeta";
import type { Work } from "@/content/types";
import { cn } from "@/lib/cn";
import { lockScroll } from "@/lib/smooth-scroll";

interface LightboxProps {
  works: Work[];
  /** Index of the open piece, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/**
 * The pieces that have no page of their own, opened at full size.
 *
 * Most of the catalogue does not carry enough behind it to fill an editorial
 * page — a title, a year, a technical sheet and one or two sentences. That is
 * not a page; it is a wall label. So the gallery opens the work itself, at the
 * largest size the screen allows, with the label beside it.
 *
 * The information follows Mariela's order exactly:
 *
 *     image → title → year → curatorial text → technical sheet
 *
 * and the curatorial text is omitted rather than invented when a piece has
 * none, which is the second half of the same rule.
 *
 * Behaviour, all of it deliberate:
 *
 *  · The picture keeps its own proportion and is never cropped. It is capped
 *    by both the width and the height of the viewport, so a tall charcoal on a
 *    short laptop shrinks instead of running off the bottom.
 *  · Escape closes, arrows move, and the panel traps focus while it is open.
 *    The page underneath does not scroll — Lenis drives the scroll here, so
 *    `overflow: hidden` alone would not hold it.
 *  · Focus returns to whatever opened it. Closing a dialog and landing at the
 *    top of the document is the classic way to lose a keyboard reader's place.
 *  · On a phone the plate takes the width and the label sits under it, with
 *    the controls on a row big enough to hit. No swipe gesture: a horizontal
 *    drag on a full-bleed image fights the browser's own back gesture on iOS,
 *    and the buttons are always reachable.
 */
export function Lightbox({
  works,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const open = index !== null;
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  /** Whatever had focus when the panel opened, to hand it back on close. */
  const opener = useRef<HTMLElement | null>(null);

  const work = open ? works[index] : undefined;

  const go = useCallback(
    (delta: number) => {
      if (index === null || works.length === 0) return;
      onIndexChange((index + delta + works.length) % works.length);
    },
    [index, works.length, onIndexChange],
  );

  /* Keyboard, scroll lock and focus, all tied to the open state. */
  useEffect(() => {
    if (!open) return;

    opener.current = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }

      /*
        Focus stays inside. Without this, tabbing walks into the gallery
        behind the panel — visible to a screen reader, invisible to everyone
        else, which is the worst of both.
      */
      if (event.key === "Tab") {
        const focusables = panel.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lockScroll(true);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      lockScroll(false);
      opener.current?.focus();
    };
  }, [open, go, onClose]);

  if (!work) return null;

  const image = work.image;
  const many = works.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-titulo"
      data-ground="chamber"
      className="fixed inset-0 z-[60] flex flex-col bg-bg text-fg"
    >
      {/* The backdrop is also the way out, as a dialog's backdrop should be. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div
        ref={panel}
        className="relative flex min-h-0 flex-1 flex-col gutter py-16 md:py-20"
      >
        <div className="mx-auto flex w-full max-w-wide items-center justify-between pb-md">
          <p className="font-sans text-2xs uppercase tracking-label text-fg-muted">
            {/* Position in the run, so nobody wonders how much is left. */}
            {(index ?? 0) + 1} / {works.length}
          </p>

          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-fg-strong transition-opacity duration-300 hover:opacity-60"
          >
            <span className="sr-only">Cerrar</span>
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        {/*
          Plate and label. Side by side from `lg`, stacked below it — and the
          whole column scrolls on a phone, where a tall charcoal plus its
          technical sheet is genuinely taller than the screen.
        */}
        <div className="mx-auto flex min-h-0 w-full max-w-wide flex-1 flex-col gap-lg overflow-y-auto lg:flex-row lg:items-center lg:gap-[4vw] lg:overflow-visible">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            {image ? (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                /*
                  Capped by height as well as width. `max-h` on the element and
                  `h-auto w-auto` together let the picture take whichever limit
                  it meets first, so its proportion is never touched.
                */
                className="h-auto max-h-[52vh] w-auto max-w-full object-contain lg:max-h-[74vh]"
                sizes="(min-width: 1024px) 60vw, 92vw"
                quality={92}
              />
            ) : null}
          </div>

          {/* Mariela's order: title → year → curatorial → technical sheet. */}
          <div className="w-full shrink-0 lg:w-[26rem]">
            <h2
              id="lightbox-titulo"
              className="font-serif text-2xl font-light leading-tight tracking-tight text-fg-strong"
            >
              {work.title}
            </h2>

            {work.year || work.attribution ? (
              <p className="mt-2xs font-sans text-sm text-fg-muted">
                {[work.attribution, work.year].filter(Boolean).join(" · ")}
              </p>
            ) : null}

            {/*
              Only when there is something to say. A piece with no curatorial
              text gets image → title → year → sheet, and no paragraph is
              written to fill the gap.
            */}
            {work.shortStory ? (
              <p className="mt-lg max-w-[46ch] font-serif text-lg font-light italic leading-snug text-pretty text-fg">
                {work.shortStory}
              </p>
            ) : null}

            {work.longStory && work.longStory.length > 0 ? (
              <div className="mt-md flex flex-col gap-sm">
                {work.longStory.map((paragraph, i) => (
                  <p
                    key={i}
                    className="max-w-[52ch] font-sans text-base leading-relaxed text-pretty text-fg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            <WorkSpecs
              work={work}
              detail="full"
              className="mt-lg border-t border-rule pt-lg"
            />
          </div>
        </div>

        {/* Previous / next, on a row that can be hit with a thumb. */}
        {many ? (
          <div className="mx-auto mt-md flex w-full max-w-wide items-center justify-between">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 items-center gap-2xs pr-md font-sans text-2xs font-medium uppercase tracking-label text-fg-strong transition-opacity duration-300 hover:opacity-60"
            >
              <ArrowLeftIcon width={16} height={16} />
              Anterior
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 items-center gap-2xs pl-md font-sans text-2xs font-medium uppercase tracking-label text-fg-strong transition-opacity duration-300 hover:opacity-60"
            >
              Siguiente
              <ArrowRightIcon width={16} height={16} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Holds which piece is open, for a gallery that renders on the server.
 *
 * The grid stays a Server Component; only this and the panel are client code.
 */
export function useLightbox(works: Work[]) {
  const [index, setIndex] = useState<number | null>(null);

  const bySlug = useMemo(
    () => new Map(works.map((work, i) => [work.slug, i])),
    [works],
  );

  return {
    index,
    open: (slug: string) => setIndex(bySlug.get(slug) ?? null),
    close: () => setIndex(null),
    setIndex,
  };
}

/** Shared by the cards that open the panel rather than leading to a page. */
export const openableCardClass = cn(
  "group block w-full cursor-zoom-in text-left",
  "focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current",
);
