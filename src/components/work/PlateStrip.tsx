"use client";

import Image from "next/image";
import type { WorkImage } from "@/content/types";
import { cn } from "@/lib/cn";

interface PlateStripProps {
  plates: WorkImage[];
  active: number;
  onSelect: (index: number) => void;
  /** Named for assistive technology, e.g. "Vistas de Oltre lo Sguardo". */
  label: string;
}

/**
 * The other views of one work, beside the plate.
 *
 * A drawing is not one photograph. There is the sheet, the passage where the
 * technique is legible, the piece still taped to the studio wall — and a
 * visitor deciding whether they are looking at something made by hand needs
 * all of them. They sit in a column at the plate's own height, and choosing
 * one swaps the large image rather than opening anything: the panel already
 * is the place where the work is seen, so nothing should open on top of it.
 *
 * Only the work itself belongs here. `framedImages` and `processImages` show a
 * room and a table, and dropping one of those into the plate replaces the
 * drawing with a photograph of a desk — see WorkSheet, which is where the
 * setting is shown on purpose.
 *
 * Selection is carried by the mat's own rule going solid, not by a coloured
 * outline: the site has no accent, and a hairline that firms up is the same
 * signal every other active state here uses.
 */
export function PlateStrip({ plates, active, onSelect, label }: PlateStripProps) {
  if (plates.length < 2) return null;

  return (
    <div
      role="tablist"
      aria-label={label}
      aria-orientation="vertical"
      /*
        A row that scrolls on a phone, a column that fills the plate's height
        from `lg` up — where the plate is capped at 68vh, so the strip divides
        the same span and the two edges line up.
      */
      className={cn(
        "flex shrink-0 gap-2xs overflow-x-auto pb-2 lg:h-[68vh] lg:flex-col",
        "lg:gap-xs lg:overflow-x-visible lg:overflow-y-auto lg:pb-0",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      )}
    >
      {plates.map((plate, i) => {
        const selected = i === active;

        return (
          <button
            key={plate.src}
            type="button"
            role="tab"
            aria-selected={selected}
            /* The strip is a control for the plate, so it never takes focus away. */
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cn(
              "relative block shrink-0 cursor-pointer border p-1 transition-colors duration-300",
              "focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current",
              "motion-reduce:transition-none",
              selected
                ? "border-fg-strong"
                : "border-rule opacity-65 hover:border-fg-muted hover:opacity-100",
            )}
          >
            <Image
              src={plate.src}
              alt={plate.caption ?? plate.alt}
              width={plate.width}
              height={plate.height}
              quality={70}
              sizes="120px"
              /*
                A fixed box with the image cropped to fill it. The views are a
                mix of proportions — a wide crop of the eyes next to a full
                portrait sheet — and left to their own ratios the column turned
                into a ragged stack. One shape each keeps it a strip.
              */
              className="h-16 w-14 object-cover sm:h-20 sm:w-16 lg:h-auto lg:w-20 lg:aspect-[3/4]"
            />
          </button>
        );
      })}
    </div>
  );
}
