import Link from "next/link";
import type { ReactNode } from "react";
import { ArtworkFrame } from "./ArtworkFrame";
import { WorkIdentity, WorkAvailability } from "./WorkMeta";
import { ArrowRightIcon, ExpandIcon } from "@/components/primitives/Icon";
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
  /**
   * Opens the piece in the lightbox. Passed only for works without a page of
   * their own; with it the card becomes a button rather than a static figure.
   */
  onOpen?: () => void;
}

/**
 * One piece in the gallery: image, title, year, and whether it can be had.
 *
 * The card used to carry the curatorial line and the full technical sheet as
 * well. Read down a grid of ten, that became ten paragraphs and ten captions
 * competing with ten drawings, and the images stopped leading. Everything but
 * the label now waits on the other side of the click — the editorial page for
 * the two pieces that have one, the lightbox for the rest.
 *
 * Availability is the exception, and it earns its place: whether a work is
 * available or in a private collection is the one thing a visitor scanning a
 * gallery is actually looking for, and hiding it behind a click makes them
 * open eight pieces to find out none are for sale.
 *
 * Mariela's full order — image → title → year → curatorial text → technical
 * sheet — holds where there is room for it. This is its first half, which is
 * what a wall label carries too.
 */
export function WorkCard({
  work,
  sizes,
  priority,
  className,
  delay = 0,
  plain = false,
  onOpen,
}: WorkCardProps) {
  // When an ancestor drives the motion, render a plain wrapper instead.
  const Frame = plain ? PlainBlock : Reveal;

  /*
    Whether the card goes anywhere. A plate with no page and no panel — which
    is what /encargos renders — must not advertise an action it cannot perform.
  */
  const interactive = work.hasEditorialPage || Boolean(onOpen);

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
        <WorkAvailability work={work} className="mt-xs" />

        {/*
          Where the card leads. Both kinds say so — a page for the two pieces
          with one, the piece itself for the rest — because a grid where some
          cards open and some do nothing is a grid nobody trusts to click.

          A span, not a link: it sits inside the card's own anchor or button,
          and nesting an interactive element in another is invalid.
        */}
        {interactive ? (
        <span
          className={cn(
            "mt-md inline-flex items-center gap-2xs py-2xs",
            "font-sans text-2xs font-medium uppercase tracking-label",
            "border-b border-fg-muted text-fg-strong",
            "transition-colors duration-300 group-hover:border-fg-strong",
          )}
        >
          {work.hasEditorialPage ? (
            <>
              {work.featuredLinkLabel ?? "Descubrir la obra"}
              <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            </>
          ) : (
            <>
              Ver la obra
              <ExpandIcon
                width={13}
                height={13}
                className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </>
          )}
        </span>
        ) : null}
      </Frame>
    </>
  );

  if (work.hasEditorialPage) {
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

  if (onOpen) {
    return (
      <article id={work.slug} className={cn("group scroll-mt-32", className)}>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${work.title}, ampliar la obra`}
          className="block w-full cursor-zoom-in text-left focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {content}
        </button>
      </article>
    );
  }

  // No page and no panel: a plain plate, which is what /encargos used to show.
  return (
    <figure id={work.slug} className={cn("group scroll-mt-32", className)}>
      {content}
    </figure>
  );
}
