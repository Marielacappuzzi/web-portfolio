import Link from "next/link";
import type { ReactNode } from "react";
import { ArtworkFrame } from "./ArtworkFrame";
import { WorkMeta } from "./WorkMeta";
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
 * One piece in the gallery. Image first, metadata under it, nothing on top of
 * the work. Becomes a link only when the piece has an editorial page.
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
          className={
            work.image
              ? "transition-transform duration-900 ease-out-quart group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              : undefined
          }
        />
      </Frame>

      <Frame delay={delay + 120} className="mt-md">
        <WorkMeta work={work} />

        {/*
          One sentence — the idea the piece turns on, never the full text.
          Copy.md is explicit that long descriptions do not belong inside the
          grid, but a single line lets Mariela's voice reach the works that do
          not have an editorial page of their own.
        */}
        {work.shortStory ? (
          <p className="mt-md max-w-[46ch] font-serif text-lg font-light italic leading-snug text-pretty text-fg">
            {work.shortStory}
          </p>
        ) : null}
      </Frame>
    </>
  );

  if (!work.hasEditorialPage) {
    return <figure className={cn("group", className)}>{content}</figure>;
  }

  return (
    <article className={cn("group", className)}>
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
