import Image from "next/image";
import { Pending } from "@/components/primitives/Pending";
import { cn } from "@/lib/cn";

interface CoverImageProps {
  /** Null until the portada has been produced. */
  src: string | null;
  alt: string;
  /** Where the crop holds as the frame narrows, e.g. "50% 30%". */
  focus?: string;
  className?: string;
}

/**
 * The full-bleed band behind the opening sentence.
 *
 * Three proportions rather than one crop, because 1920 × 750 (2.56:1) turns
 * into a letterbox slot on a phone. The band grows taller as the viewport
 * narrows so the figure keeps room to breathe:
 *
 *   · phone   4/5   — nearly portrait, the figure reads at arm's length
 *   · tablet  16/9  — the familiar landscape
 *   · desktop 1920 × 750 exactly
 *
 * A scrim sits over the picture. It is the one place on the site where
 * something is laid over the work, and it exists for a single reason: white
 * type on charcoal needs contrast to stay legible, and the alternative —
 * moving the words off the image — is what the brief asks against here. It is
 * a vertical gradient weighted to the left, so it darkens the column the text
 * occupies and leaves the rest of the picture alone.
 */
export function CoverImage({ src, alt, focus, className }: CoverImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-ink",
        "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[1920/750]",
        className,
      )}
    >
      {src ? (
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
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Pending kind="asset" detail="Portada 1920 × 750" />
        </div>
      )}

      {/*
        Legibility scrim. Strongest at the lower left where the type sits,
        clearing entirely towards the top right so the artwork stays visible.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent"
      />
    </div>
  );
}
