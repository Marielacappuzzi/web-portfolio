import Link from "next/link";
import type { ReactNode } from "react";
import { ArtworkFrame } from "./ArtworkFrame";
import { WorkIdentity } from "./WorkMeta";
import { ArrowRightIcon } from "@/components/primitives/Icon";
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
 * One piece in the gallery: image, title, year. Nothing else.
 *
 * The card used to carry the curatorial line and the technical sheet as well.
 * Read down a grid of ten that became ten paragraphs competing with ten
 * drawings, and the writing lost twice — it was too short to say anything and
 * too long to skim. Mariela asked for the grid to be images and names, with
 * everything else waiting on the other side of the click.
 *
 * The full order she set — image → title → year → curatorial text → technical
 * sheet — still holds; it now lives where there is room for it, on the work's
 * own page. What survives here is its first half, which is what a wall label
 * carries too.
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
          Only the pieces with a page of their own. The card is a link either
          way, but three of these lead somewhere and the rest do not, and the
          grid gave no way to tell. A span, not a link: it sits inside the
          card’s own anchor and nesting links is invalid.
        */}
        {work.hasEditorialPage ? (
          <span
            className={cn(
              "mt-md inline-flex items-center gap-2xs py-2xs",
              "font-sans text-2xs font-medium uppercase tracking-label",
              "border-b border-fg-muted text-fg-strong",
              "transition-colors duration-300 group-hover:border-fg-strong",
            )}
          >
            {work.featuredLinkLabel ?? "Descubrir la obra"}
            <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </span>
        ) : null}
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
