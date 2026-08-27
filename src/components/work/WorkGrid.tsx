"use client";

import { WorkCard } from "./WorkCard";
import { ScrollReveal } from "@/components/primitives/ScrollReveal";
import type { Work } from "@/content/types";
import { cn } from "@/lib/cn";

interface WorkGridProps {
  works: Work[];
  /**
   * Opens a piece in the lightbox. The panel lives one level up, in
   * WorkCatalogue, so both groups on /obra share a single run — see the note
   * there. Omit it where nothing can be opened, as /encargos does.
   */
  onOpen?: (work: Work) => void;
  className?: string;
}

/**
 * Not a uniform catalogue grid.
 *
 * Pieces alternate side and sit at different heights so the work breathes and
 * the page reads as a hang rather than a product listing. The pattern repeats
 * every two items, so it scales to any number of works without new rules.
 *
 * Each piece arrives on the scroll rather than on a timer — see ScrollReveal.
 * The right-hand column travels a little further, so the two columns never
 * rise in lockstep and the wall assembles itself as the reader descends.
 */
export function WorkGrid({ works, onOpen, className }: WorkGridProps) {
  if (works.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-y-3xl md:grid-cols-2 md:gap-x-[6vw] md:gap-y-4xl",
        className,
      )}
    >
      {works.map((work, i) => {
        const isRight = i % 2 === 1;

        return (
          <ScrollReveal key={work.slug} distance={isRight ? 88 : 56}>
            <WorkCard
              work={work}
              plain
              sizes="(min-width: 768px) 42vw, 100vw"
              onOpen={
                onOpen && !work.hasEditorialPage
                  ? () => onOpen(work)
                  : undefined
              }
              className={cn(isRight ? "md:mt-[8vw] md:pl-[10%]" : "md:pr-[10%]")}
            />
          </ScrollReveal>
        );
      })}
    </div>
  );
}
