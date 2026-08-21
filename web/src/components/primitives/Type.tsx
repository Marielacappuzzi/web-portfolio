import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Typographic primitives. Every heading, label and body block on the site goes
 * through one of these, so the scale stays a system rather than a habit.
 */

/* -------------------------------------------------------------- eyebrow --- */

interface EyebrowProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Set when the eyebrow doubles as the section heading it labels. */
  id?: string;
}

/** Small caps rotulation. Always precedes a heading, never stands alone. */
export function Eyebrow({
  children,
  as: Tag = "p",
  className,
  id,
}: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-sans text-2xs font-medium uppercase tracking-label text-fg-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------- display --- */

type DisplaySize = "hero" | "cover" | "section" | "sub";

interface DisplayProps {
  children: ReactNode;
  as?: ElementType;
  size?: DisplaySize;
  /**
   * Line-length cap, in `ch`. Applied as an inline style rather than a utility
   * class: two `max-w-*` classes on one element are resolved by CSS source
   * order, not by the order they appear in the attribute, so overriding the
   * preset from `className` was a coin flip.
   */
  measure?: number;
  className?: string;
  id?: string;
}

/**
 * Size, and the measure that goes with it.
 *
 * The `ch` cap is what keeps a headline to two or three lines instead of one
 * long ribbon on a wide screen or a ragged stack of five on a narrow column.
 * Combined with `text-balance`, which evens out the lines it does produce, a
 * title reads as a deliberately set block. Override with `className` only when
 * a specific composition needs it.
 */
const displaySize: Record<DisplaySize, string> = {
  hero: "text-4xl leading-display",
  // Over a cover image: smaller than `hero` so the sentence holds two or
  // three lines beside the artwork instead of towering over it.
  cover: "text-cover leading-cover",
  section: "text-3xl leading-display",
  sub: "text-xl leading-tight",
};

/** Default cap per size, in `ch`, measured on the heading's own font. */
const defaultMeasure: Record<DisplaySize, number> = {
  hero: 16,
  cover: 20,
  section: 20,
  sub: 26,
};

/** Editorial serif heading. Weight stays light; italic is never the default. */
export function Display({
  children,
  as: Tag = "h2",
  size = "section",
  measure,
  className,
  id,
}: DisplayProps) {
  return (
    <Tag
      id={id}
      style={{ maxWidth: `${measure ?? defaultMeasure[size]}ch` }}
      className={cn(
        "font-serif font-light tracking-display text-balance text-fg-strong",
        displaySize[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- prose --- */

interface ProseProps {
  paragraphs: string[];
  /** Slightly larger opening paragraph for section intros. */
  lead?: boolean;
  className?: string;
  revealFrom?: number;
}

/** A stack of body paragraphs at the reading measure. */
export function Prose({ paragraphs, lead = false, className }: ProseProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-md font-sans leading-relaxed text-fg",
        lead ? "text-lg" : "text-base",
        className,
      )}
    >
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="max-w-[62ch] text-pretty">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ pullquote --- */

interface PullQuoteProps {
  children: ReactNode;
  className?: string;
}

/**
 * The one place italic is allowed. One per section at most — it marks the
 * sentence the reader should carry away.
 */
export function PullQuote({ children, className }: PullQuoteProps) {
  return (
    <p
      className={cn(
        "max-w-[26ch] font-serif text-2xl font-light italic leading-tight tracking-tight text-balance text-fg-strong",
        className,
      )}
    >
      {children}
    </p>
  );
}
