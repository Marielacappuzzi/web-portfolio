import Image from "next/image";
import { Pending } from "@/components/primitives/Pending";
import { cn } from "@/lib/cn";

interface CoverImageProps {
  /** Landscape file. Null until the portada has been produced. */
  src: string | null;
  alt: string;
  /** Portrait file for phones. Falls back to recropping `src` without it. */
  mobileSrc?: string;
  /** Where the crop holds as the frame narrows, e.g. "50% 30%". */
  focus?: string;
  /**
   * Override the band proportions. Defaults to the home portada; a work page
   * passes a taller set because the photographs are portrait.
   */
  aspect?: string;
  /**
   * How the scrim reads. `light` veils a pale photograph so dark type stays
   * legible; `dark` weights the lower left for light type over charcoal.
   */
  scrim?: "light" | "dark";
  /** Shown inside the placeholder so it is clear which picture is missing. */
  pendingLabel?: string;
  className?: string;
}

/**
 * The full-bleed band behind the opening sentence.
 *
 * Two files, not one crop. 1920 × 750 is 2.56:1, and on a phone that becomes
 * a letterbox slot — recropping it to portrait would push the frame out of
 * shot. The portrait file is composed for that shape instead, with the picture
 * low and the wall open above it, and `<picture>` hands the browser whichever
 * one fits. The landscape file is never downloaded on a phone.
 *
 * The scrim is the one place on the site where anything is laid over the work,
 * and it earns that only because type needs contrast. Both directions exist
 * because the ground under the words decides which way to go: the home portada
 * is a pale wall, so it takes a light veil and dark type; a charcoal band
 * takes the dark one. Measuring the picture beats assuming, and this one reads
 * at 0.72 luminance where the sentence sits.
 */
export function CoverImage({
  src,
  alt,
  mobileSrc,
  focus,
  aspect = "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[1920/750]",
  scrim = "dark",
  pendingLabel = "Portada 1920 × 750",
  className,
}: CoverImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        scrim === "light" ? "bg-paper" : "bg-ink",
        aspect,
        className,
      )}
    >
      {src ? (
        mobileSrc ? (
          /*
            next/image cannot switch source files by breakpoint, so the art
            direction happens in markup. `fetchPriority` and `decoding` are set
            explicitly because this is the LCP element on every visit.
          */
          <picture>
            <source media="(min-width: 640px)" srcSet={src} />
            <img
              src={mobileSrc}
              alt={alt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={focus ? { objectPosition: focus } : undefined}
            />
          </picture>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
            style={focus ? { objectPosition: focus } : undefined}
          />
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Pending kind="asset" detail={pendingLabel} />
        </div>
      )}

      {/*
        Legibility veil, on the text column only.

        One horizontal pass that fades out by the midpoint, so the half of the
        frame holding the work is never touched. An earlier version added a
        vertical wash across the full width as well; it dulled the picture to
        light words that were already legible.

        Below `sm` the type sits under the image rather than on it, so no veil
        is needed at all.
      */}
      {src ? (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 hidden sm:block",
            scrim === "light"
              ? "bg-gradient-to-r from-paper/90 via-paper/45 via-35% to-transparent to-55%"
              : "bg-gradient-to-r from-ink/85 via-ink/40 via-35% to-transparent to-55%",
          )}
        />
      ) : null}
    </div>
  );
}
