import Image from "next/image";
import { Mat } from "./Mat";
import { Pending } from "./Pending";
import { cn } from "@/lib/cn";

interface FigureProps {
  /** Null while the photograph has not been provided. */
  src: string | null;
  alt: string;
  sizes: string;
  /** Shown inside the placeholder so it is obvious which photograph is missing. */
  pendingLabel: string;
  aspect?: string;
  /**
   * Intrinsic size. Given both, the frame takes the photograph’s own ratio
   * and `aspect` is ignored — nothing is cropped. Use where the pictures are
   * not meant to line up with each other.
   */
  width?: number;
  height?: number;
  /** `object-position` when the aspect crops, e.g. "50% 30%". */
  focus?: string;
  caption?: string;
  priority?: boolean;
  /** Drop the passepartout where the image runs full-bleed. */
  bare?: boolean;
  /**
   * Grow the photograph inside its frame while the pointer is over it, and
   * settle back when it leaves.
   *
   * The frame never moves and the picture never leaves it: the wrapper owns
   * `overflow-hidden`, so what the viewer sees is the image coming closer
   * within a fixed opening, not a card lifting off the page. The scale is
   * 1.04 — enough to register as movement, small enough that nothing
   * important drifts out of the crop.
   */
  zoomOnHover?: boolean;
  className?: string;
}

/**
 * Photographs that are not artwork — Mariela at work, the studio, the process,
 * a framed edition.
 *
 * Same contract as ArtworkFrame: the passepartout by default, and a declared
 * plate at the right proportion when the file does not exist yet, rather than
 * a broken image or a stand-in taken from somewhere else.
 */
export function Figure({
  src,
  alt,
  sizes,
  pendingLabel,
  aspect = "aspect-[4/5]",
  width,
  height,
  focus,
  caption,
  priority,
  bare = false,
  zoomOnHover = false,
  className,
}: FigureProps) {
  const inner = src ? (
    <div
      className={cn("relative w-full overflow-hidden", !width && aspect)}
      style={
        width && height ? { aspectRatio: `${width} / ${height}` } : undefined
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className={cn(
          "object-cover",
          zoomOnHover &&
            "transition-transform duration-[900ms] ease-out-quart group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </div>
  ) : (
    <div
      className={cn(
        "flex w-full items-center justify-center px-md text-center",
        "bg-fg-strong/4.5",
        aspect,
      )}
    >
      <Pending kind="asset" detail={pendingLabel} />
    </div>
  );

  return (
    <figure className={cn("group w-full", zoomOnHover && "cursor-default", className)}>
      {bare ? inner : <Mat>{inner}</Mat>}

      {caption ? (
        <figcaption className="mt-sm font-sans text-xs text-fg-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
