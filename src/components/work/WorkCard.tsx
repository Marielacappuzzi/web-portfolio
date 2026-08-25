import Link from "next/link";
import type { ReactNode } from "react";
import { ArtworkFrame } from "./ArtworkFrame";
import { WorkIdentity, WorkSpecs } from "./WorkMeta";
import { Reveal } from "@/components/primitives/Reveal";
import type { Work } from "@/content/types";
import { cn } from "@/lib/cn";

/** Stand-in for Reveal that renders nothing but a div. */
function PlainBlock({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
  variant?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

interface WorkCardProps {
  work: Work;
  sizes: string;
  priority?: boolean;
  className?: string;
  delay?: number;
  /**
   * Skip the internal reveals. Set it when an ancestor already animates the
   * card — two tweens on the same opacity fight each other.
   */
  plain?: boolean;
}

/**
 * One piece in the gallery, in Mariela's order:
 *
 *     image → title → year → curatorial line → technical sheet
 *
 * The curatorial line is hers and sits between the name and the specs, where
 * it gets read. The sheet closes the block, set apart by a hairline so it
 * reads as a caption to the piece rather than a continuation of the writing.
 */
export function WorkCard({
  work,
  sizes,
  priority,
  className,
  delay = 0,
  plain = false,
}: WorkCardProps) {
  // When an ancestor drives the motion, render a plain wrapper instead.
  const Frame = plain ? PlainBlock : Reveal;

  const content = (
    <>
      <Frame variant="image" delay={delay} className="block">
        <ArtworkFrame
          work={work}
          sizes={sizes}
          priority={priority}
          zoomOnHover
        />
      </Frame>

      <Frame delay={delay + 120} className="mt-lg">
        <WorkIdentity work={work} />

        {/*
          One sentence — the idea the piece turns on, never the full text.
          Copy.md rules out long descriptions inside the grid, but a single
          line lets Mariela's voice reach the works that have no editorial page
          of their own.
        */}
        {work.shortStory ? (
          <p className="mt-md max-w-[46ch] font-serif text-lg font-light italic leading-snug text-pretty text-fg">
            {work.shortStory}
          </p>
        ) : null}

        <WorkSpecs work={work} className="mt-lg border-t border-rule pt-md" />
      </Frame>
    </>
  );

  if (!work.hasEditorialPage) {
    return (
      <figure id={work.slug} className={cn("group scroll-mt-32", className)}>
        {content}
      </figure>
    );
  }

  return (
    <article id={work.slug} className={cn("group scroll-mt-32", className)}>
      <Link
        href={`/obra/${work.slug}`}
        className="block"
        aria-label={`${work.title}, ver la obra`}
      >
        {content}
      </Link>
    </article>
  );
}
