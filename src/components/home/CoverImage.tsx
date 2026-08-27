import Image from "next/image";
import { Pending } from "@/components/primitives/Pending";
import { ScrollScale } from "@/components/primitives/ScrollScale";
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
   * How the scrim reads.
   *
   * `light` veils a pale photograph so dark type stays legible. `dark` weights
   * the left heavily for light type over charcoal. `soft` is the same
   * direction as `dark` at roughly two thirds the weight — for a photograph
   * whose left is already a mid-tone wall, where a full veil would flatten the
   * warmth it was lit for. `none` shows the picture untouched.
   */
  scrim?: "light" | "dark" | "soft" | "none";
  /**
   * Where `<picture>` swaps the portrait file for the landscape one. It
   * defaults to the `sm` breakpoint; the home hero raises it to `md` so the
   * file and the layout change in the same breath — the type moves on top of
   * the band at exactly the width where the band gets wide enough to hold it.
   */
  mobileMedia?: string;
  /** Shown inside the placeholder so it is clear which picture is missing. */
  pendingLabel?: string;
  /**
   * Scale the photograph as the band scrolls past, inside its fixed frame.
   * The frame never moves; only the picture grows, so the work comes towards
   * the reader rather than the layout shifting under them.
   */
  zoomOnScroll?: boolean;
  /**
   * An even wash over the whole picture, on top of the gradient. Set it where
   * the source is soft — a phone still blown up to fill a screen — because a
   * darker frame hides grain that a bright one puts on display.
   */
  dim?: boolean;
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
  mobileMedia = "(min-width: 640px)",
  zoomOnScroll = false,
  dim = false,
  pendingLabel = "Portada 1920 × 750",
  className,
}: CoverImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        /*
          The ground behind the photograph, seen only while it loads and in
          the letterbox if one ever appears. `none` means no veil and no
          tinted ground — the band is the picture and nothing else.
        */
        scrim === "light" && "bg-paper",
        (scrim === "dark" || scrim === "soft") && "bg-ink",
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
            <source media={mobileMedia} srcSet={src} />
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
          <ScrollScale className="absolute inset-0" to={zoomOnScroll ? 1.08 : 1}>
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
          </ScrollScale>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Pending kind="asset" detail={pendingLabel} />
        </div>
      )}

      {/*
        An even wash, when asked for. It goes under the gradient below, so the
        column holding the type is still the darkest part of the frame.
      */}
      {src && dim ? (
        <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
      ) : null}

      {/*
        Legibility veil, on the text column only.

        One horizontal pass that fades out by the midpoint, so the half of the
        frame holding the work is never touched. An earlier version added a
        vertical wash across the full width as well; it dulled the picture to
        light words that were already legible.

        Below `sm` the type sits under the image rather than on it, so no veil
        is needed at all.
      */}
      {src && scrim !== "none" ? (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            /*
              `soft` appears at `xl` because that is where the hero it serves
              moves its type onto the band — the bare wall is 29% of the
              picture's width, and narrower than that it cannot hold a
              sentence. Below it the veil would darken a photograph nothing is
              written over.
            */
            scrim === "soft" ? "hidden xl:block" : "hidden sm:block",
            scrim === "light" &&
              "bg-gradient-to-r from-paper/90 via-paper/45 via-35% to-transparent to-55%",
            scrim === "dark" &&
              "bg-gradient-to-r from-ink/85 via-ink/40 via-35% to-transparent to-55%",
            /*
              Four stops, and it holds further right than it did. The hero's
              type now runs to about 44% of the width, which is past the bare
              wall and onto the edge of the sheet — bright paper, where white
              type at the old strength measured 2.1:1. It fades out at 72%,
              which is short of Mariela's face, so nothing is laid over her or
              over the part of the drawing the picture is about.
            */
            scrim === "soft" &&
              "bg-gradient-to-r from-ink/72 from-0% via-ink/45 via-48% to-transparent to-72%",
          )}
        />
      ) : null}
    </div>
  );
}
