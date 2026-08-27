import Link from "next/link";
import type { ReactNode } from "react";
import { ArtworkFrame } from "./ArtworkFrame";
import { WorkIdentity } from "./WorkMeta";
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
   * Opens the work at full size. Only for pieces without a page of their own:
   * those lead somewhere, these open in place.
   */
  onOpen?: () => void;
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
  onOpen,
}: WorkCardProps) {
  // When an ancestor drives the motion, render a plain wrapper instead.
  const Frame = plain ? PlainBlock : Reveal;

  /*
    Whether the card leads anywhere. A plate with no page and no panel must
    not advertise an action it cannot perform.
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

        {/*
          No interpretive line here. The brief is explicit: under each work,
          the technical record and nothing else — name, year, technique,
          measurements, availability. A poetic sentence beside every thumbnail
          reads as filler by the third one, and the works that have something
          to say have a page where they say it properly.
        */}

        {/*
          Image and name, nothing else. The technical sheet moved to the work
          page: in a grid it was a second block of small type under every
          thumbnail, and the client reads that as noise. Someone scanning the
          gallery is choosing what to open — the sheet is what they get when
          they arrive.
        */}

        {/*
          Every card that does something says so.

          Only the pieces with a page carried a label before, so the other
          eight were photographs a visitor could click without any sign that
          clicking did anything — the whole lightbox was invisible unless you
          guessed. They now carry their own affordance, worded for what they
          actually do: a page opens, a plate expands.

          A span, not a link: it sits inside the card's own anchor or button,
          and nesting one interactive element in another is invalid.
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
                Ver la obra
                <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
              </>
            ) : (
              <>
                Ampliar la obra
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

  if (!work.hasEditorialPage) {
    /*
      No page of its own, so it opens in place. A button rather than a link:
      it goes nowhere, and announcing a destination that does not exist is
      worse than announcing nothing.
    */
    if (onOpen) {
      return (
        <figure id={work.slug} className={cn("group scroll-mt-32", className)}>
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${work.title}, ver en tamaño completo`}
            className="block w-full cursor-zoom-in text-left focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            {content}
          </button>
        </figure>
      );
    }

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
