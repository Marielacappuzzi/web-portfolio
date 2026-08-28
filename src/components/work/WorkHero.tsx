import { Container } from "@/components/layout/Section";
import type { Work } from "@/content/types";

interface WorkHeroProps {
  work: Work;
}

/**
 * How a flagship work's page opens: its banner, and its name.
 *
 * The page used to open on the photograph of the sheet itself, cropped into a
 * landscape band — which meant the first thing a visitor saw was a drawing
 * with its top and bottom cut off. The banners are photographs of each piece
 * hung in a room, shot for this proportion, so nothing is being re-framed.
 *
 * The name and nothing else. No sheet, no year, no badge, no button: those all
 * belong to the block underneath, and a cover carrying five things is a
 * header, not a cover.
 *
 * Two files per work, swapped at `md`. 1920 x 600 is 3.2:1, which on a phone
 * is a letterbox slot with the room in it and the drawing an inch tall; the
 * 960 x 1400 file reframes the same scene for the narrow shape.
 *
 * The wash is measured rather than assumed: the lower-left corner of the three
 * banners reads 54, 59 and 96 of 255, so white already clears 6:1 on all of
 * them. It rises from the foot, is gone by halfway, and never reaches the work.
 */
export function WorkHero({ work }: WorkHeroProps) {
  const banner = work.banner;
  if (!banner) return null;

  return (
    <section
      data-ground="chamber"
      aria-labelledby="obra-titulo"
      className="relative isolate bg-bg text-fg"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={banner.src} />
        <img
          src={banner.mobileSrc}
          alt={banner.alt}
          /* The page's own LCP: never lazy, and asked for early. */
          fetchPriority="high"
          decoding="async"
          className="aspect-[960/1400] w-full object-cover md:aspect-[1920/600]"
          style={{ objectPosition: banner.focus }}
        />
      </picture>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/55 via-35% to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0">
        <Container width="wide" className="pb-xl md:pb-2xl">
          <h1
            id="obra-titulo"
            className="font-serif text-3xl font-light leading-tight tracking-tight text-fg-strong [text-shadow:0_1px_18px_rgb(0_0_0/0.55)] md:text-4xl"
          >
            {work.title}
          </h1>
        </Container>
      </div>
    </section>
  );
}
