import Image from "next/image";
import { Mat } from "@/components/primitives/Mat";
import { Pending } from "@/components/primitives/Pending";
import type { Ratio, Work } from "@/content/types";
import { cn } from "@/lib/cn";

const fallbackRatios: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

interface ArtworkFrameProps {
  work: Work;
  /** Responsive hint. Always pass it — the work is shown large. */
  sizes: string;
  /** Only for the piece above the fold. */
  priority?: boolean;
  /**
   * Force a shared proportion. Use only where a row must line up; it crops,
   * and cropping decides something Mariela already decided.
   */
  ratio?: Ratio;
  /** Arbitrary aspect for banners, e.g. "aspect-[21/9]". Wins over `ratio`. */
  aspect?: string;
  /** `object-position` when a forced aspect crops, e.g. "50% 30%". */
  focus?: string;
  /** Drop the passepartout where the image is meant to run full-bleed. */
  bare?: boolean;
  className?: string;
}

/**
 * The single place a piece of work becomes pixels.
 *
 * Each piece keeps its own proportion by default: the frame takes its aspect
 * ratio from the photograph's real pixel dimensions rather than forcing every
 * work into one crop. Mariela's catalogue runs from 100 × 70 to 33 × 27 cm, and
 * a shared aspect box would cut into compositions she already resolved. Pass
 * `ratio` or `aspect` only where a layout genuinely needs alignment.
 *
 * When the photograph does not exist it renders an intentional plate: correct
 * proportion, the title, and a declared pending marker.
 */
export function ArtworkFrame({
  work,
  sizes,
  priority = false,
  ratio,
  aspect,
  focus,
  bare = false,
  className,
}: ArtworkFrameProps) {
  const forced = aspect ?? (ratio ? fallbackRatios[ratio] : undefined);

  if (!work.image) {
    const plate = (
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-center gap-md",
          "bg-fg-strong/4.5",
          forced ?? fallbackRatios[work.ratio ?? "portrait"],
        )}
      >
        <span className="px-md text-center font-serif text-xl font-light leading-tight tracking-tight text-fg-muted">
          {work.title}
        </span>
        <Pending kind="asset" />
      </div>
    );

    return bare ? (
      <div className={className}>{plate}</div>
    ) : (
      <Mat className={className}>{plate}</Mat>
    );
  }

  const { src, alt, width, height } = work.image;

  const picture = (
    <div
      className={cn("relative w-full overflow-hidden", forced)}
      style={forced ? undefined : { aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className="object-cover"
        style={focus ? { objectPosition: focus } : undefined}
      />
    </div>
  );

  return bare ? (
    <div className={className}>{picture}</div>
  ) : (
    <Mat className={className}>{picture}</Mat>
  );
}
