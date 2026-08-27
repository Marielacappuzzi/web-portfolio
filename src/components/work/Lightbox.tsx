"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ArrowRightIcon } from "@/components/primitives/Icon";
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

/**
 * A work at full size, with its technical record.
 *
 * The catalogue is read at thumbnail scale, which is enough to choose but not
 * enough to look. This is where a piece is actually seen — so the image gets
 * the room and the sheet sits beside it, quiet.
 *
 * Keyboard: Escape closes, arrows move. Those are the three keys anyone tries,
 * and a gallery that ignores them feels broken rather than minimal.
 *
 * Lenis is stopped while it is open. Setting `overflow: hidden` would not be
 * enough — Lenis drives the page on its own clock and would keep scrolling the
 * catalogue behind the overlay.
 */
export function Lightbox({ works, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const work = open ? works[index] : null;

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

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose, go]);

  if (!work?.image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      data-ground="chamber"
      className={cn(
        "fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink/97",
        "transition-opacity duration-400",
      )}
      onClick={onClose}
    >
      {/* Close. Top right, where a reader reaches for it without looking. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="fixed right-6 top-6 z-10 flex h-11 w-11 items-center justify-center text-fg-strong transition-opacity duration-300 hover:opacity-60"
      >
        <span aria-hidden="true" className="relative block h-4 w-4">
          <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
        </span>
      </button>

      <div
        className="gutter mx-auto flex w-full max-w-wide flex-1 flex-col justify-center py-24"
        /* Clicks inside the plate must not fall through to the backdrop. */
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid gap-2xl lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]">
          <div className="lg:col-span-8">
            <div
              className="relative w-full"
              style={{
                aspectRatio: `${work.image.width} / ${work.image.height}`,
                maxHeight: "72vh",
              }}
            >
              <Image
                src={work.image.src}
                alt={work.image.alt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 66vw, 92vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <WorkIdentity work={work} />
            <WorkSpecs work={work} className="mt-md border-t border-rule pt-md" />

            {works.length > 1 ? (
              <div className="mt-xl flex items-center gap-lg">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Obra anterior"
                  className="group flex items-center gap-2xs font-sans text-2xs uppercase tracking-label text-fg transition-colors duration-300 hover:text-fg-strong"
                >
                  <ArrowRightIcon className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                  Anterior
                </button>

                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Obra siguiente"
                  className="group flex items-center gap-2xs font-sans text-2xs uppercase tracking-label text-fg transition-colors duration-300 hover:text-fg-strong"
                >
                  Siguiente
                  <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
