"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRightIcon, CloseIcon } from "@/components/primitives/Icon";
import { Mat } from "@/components/primitives/Mat";
import { WorkIdentity, WorkSpecs } from "./WorkMeta";
import { lockScroll } from "@/lib/smooth-scroll";
import type { Work } from "@/content/types";
import { cn } from "@/lib/cn";

interface LightboxProps {
  works: Work[];
  /** Index of the open work, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** The two controls at the foot of the sheet. Same shape, mirrored. */
const stepButton = cn(
  "group inline-flex cursor-pointer items-center gap-2xs py-2xs",
  "font-sans text-2xs font-medium uppercase tracking-label",
  "border-b border-fg-muted text-fg-strong",
  "transition-colors duration-300 hover:border-fg-strong",
  "focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current",
);

/**
 * A work at full size, with its technical record.
 *
 * The catalogue is read at thumbnail scale, which is enough to choose but not
 * enough to look. This is where a piece is actually seen — so the image gets
 * the room and the sheet sits beside it, quiet.
 *
 * The plate is matted, like every other image on the site. It was bare here,
 * which made the one place a drawing is shown large the one place it was not
 * framed: the picture floated on the dark ground with nothing holding it, and
 * a charcoal on cream paper needs an edge or it bleeds into the field.
 *
 * The controls are matched to the cards that opened them — the same hairline
 * under small caps, the same arrow that travels on hover — so moving from the
 * gallery into the panel does not feel like arriving in a different interface.
 * They also carry a real pointer cursor, which a bare `<button>` does not.
 *
 * Keyboard: Escape closes, arrows move, focus is trapped while it is open and
 * handed back to whatever opened it on the way out. Those are the keys anyone
 * tries, and a gallery that ignores them feels broken rather than minimal.
 *
 * Lenis is stopped while it is open. Setting `overflow: hidden` would not be
 * enough — Lenis drives the page on its own clock and would keep scrolling the
 * catalogue behind the overlay.
 */
export function Lightbox({ works, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const work = open ? works[index] : null;

  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  /** Whatever had focus when the panel opened, to hand it back on close. */
  const opener = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      const next = (index + step + works.length) % works.length;
      onNavigate(next);
    },
    [index, works.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    lockScroll(true);
    opener.current = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);

      /*
        Focus stays inside. Without this, tabbing walks into the catalogue
        behind the overlay — reachable by keyboard, invisible on screen, which
        is the worst of both.
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

    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      opener.current?.focus();
    };
  }, [open, onClose, go]);

  if (!work?.image) return null;

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      data-ground="chamber"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink/97 transition-opacity duration-400"
      onClick={onClose}
    >
      {/* Close. Top right, where a reader reaches for it without looking. */}
      <button
        ref={closeButton}
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="fixed right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-fg-strong transition-opacity duration-300 hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current sm:right-6 sm:top-6 sm:bg-transparent"
      >
        <CloseIcon width={18} height={18} />
      </button>

      {/*
        `my-auto` on a block, not `justify-center` on a flex parent.

        Those look equivalent and are not: when the content is taller than the
        viewport — which on a phone it always is, a drawing plus its label —
        `justify-content: center` pushes the overflow past *both* ends of the
        scroll container and the top becomes unreachable. That is why the title
        and the technical sheet were being cut off. Auto margins centre the
        same way and stay scrollable.
      */}
      <div
        className="gutter mx-auto my-auto w-full max-w-wide py-16 sm:py-24"
        /* Clicks inside the plate must not fall through to the backdrop. */
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid gap-lg lg:grid-cols-12 lg:items-center lg:gap-x-[4vw] lg:gap-y-2xl">
          <div className="flex justify-center lg:col-span-8">
            {/*
              The mat hugs the drawing, and the drawing sizes itself.

              It used to be a `w-full` box carrying the file's aspect ratio
              with `max-height: 70vh` on top. Those two fight: the box took the
              whole column and the ratio asked for a very tall one, so the cap
              flattened it into a wide, short rectangle — and a portrait
              drawing inside it, `object-contain`, shrank to the height and
              left a broad empty frame either side. A vertical work in a
              horizontal box, which is the opposite of a passepartout.

              With intrinsic width and height on the image and `w-fit` on the
              mat, the picture takes its own proportion, the height cap is the
              only limit, and the border lands on the paper's edge.
            */}
            <Mat className="w-fit">
              <Image
                src={work.image.src}
                alt={work.image.alt}
                width={work.image.width}
                height={work.image.height}
                quality={92}
                sizes="(min-width: 1024px) 60vw, 92vw"
                /*
                  Shorter on a phone. At 68vh the drawing took most of the
                  screen and the label underneath it started below the fold,
                  which is what made the information feel missing rather than
                  merely further down.
                */
                className="h-auto max-h-[48vh] w-auto max-w-full object-contain sm:max-h-[60vh] lg:max-h-[68vh]"
                priority
              />
            </Mat>
          </div>

          {/* The label: title, year, then the sheet — Mariela's order. */}
          <div className="lg:col-span-4">
            <WorkIdentity work={work} />
            <WorkSpecs work={work} className="mt-md border-t border-rule pt-md" />

            {works.length > 1 ? (
              <>
                {/* Where you are in the run, so nothing feels endless. */}
                <p className="mt-xl font-sans text-2xs uppercase tracking-label text-fg-muted">
                  {(index ?? 0) + 1} / {works.length}
                </p>

                <div className="mt-sm flex flex-wrap items-center gap-x-xl gap-y-md">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Obra anterior"
                    className={stepButton}
                  >
                    <ArrowRightIcon className="shrink-0 rotate-180 transition-transform duration-300 ease-out-quart group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                    Anterior
                  </button>

                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Obra siguiente"
                    className={stepButton}
                  >
                    Siguiente
                    <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
