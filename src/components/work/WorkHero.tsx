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
 * The name, and — where an edition exists — one line saying so. Nothing else:
 * no sheet, no year, no button. Those belong to the block underneath, and a
 * cover carrying five things is a header rather than a cover. The edition line
 * earns its exception by being the one thing a reader can act on.
 *
 * Two files per work, swapped at `md`. 1920 x 600 is 3.2:1, which on a phone
 * is a letterbox slot with the room in it and the drawing an inch tall; the
 * 960 x 1400 file reframes the same scene for the narrow shape.
 *
 * From `md` the band takes the full screen height rather than the file's own
 * proportion. At 3.2:1 the name had to sit close under the work; with the
 * height of the viewport there is room below the piece for it to have a corner
 * of its own.
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
          /*
            The whole screen from `md` up, not the file's own 3.2:1 band.

            At 1920 x 1080 `object-cover` scales the banner to 3456 wide and
            shows the middle 1920 of it — original x 426 to 1493. The drawing
            in all three banners sits between 580 and 1350, so the crop takes
            the room and never the work, and the extra height is what leaves
            the name a corner of its own instead of a line across the piece.
          */
          className="aspect-[960/1400] w-full object-cover md:aspect-auto md:h-[100svh]"
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
            className="font-serif text-3xl font-light leading-tight tracking-tight text-fg-strong [text-shadow:0_1px_18px_rgb(0_0_0/0.55)] md:text-4xl lg:text-5xl"
          >
            {work.title}
          </h1>

          {/*
            The attribution, immediately under the name and part of it.

            Sueño de Primavera is a reproduction of Bouguereau's Rêve de
            printemps, and Mariela's instruction is that "after Bouguereau" is
            indivisible from the title — a reader who meets the drawing without
            it is being allowed to take the composition for her invention.
            Smaller and italic, the way a gallery label sets it, so the
            hierarchy still reads name-then-source; full brightness rather than
            `fg`, because at 0.72 over this banner it measures 4.18:1 and a
            line that belongs to the title should not be the faint one.
          */}
          {work.attribution ? (
            <p className="mt-2xs font-serif text-sm font-light italic leading-snug text-fg-strong [text-shadow:0_1px_18px_rgb(0_0_0/0.55)] md:text-base">
              {work.attribution}
            </p>
          ) : null}

          {/*
            One line under the name, and only where an edition exists.

            It is the single commercial fact on a page that is otherwise a
            work — that this piece can still be had, and in what quantity. The
            wording is Mariela's own from the edition's data rather than a
            label invented here, so it stays true if the last copy sells.
          */}
          {work.printEdition ? (
            <p className="mt-sm font-sans text-2xs font-medium uppercase tracking-label text-fg-strong [text-shadow:0_1px_14px_rgb(0_0_0/0.55)]">
              Print · {work.printEdition.availability}
            </p>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
