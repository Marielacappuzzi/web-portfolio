import { Container } from "@/components/layout/Section";
import { statusLabels } from "./WorkMeta";
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
 * The wash is measured, and the measurement that mattered was the wrong one:
 * the corner of each banner reads 54, 59 and 96 of 255, which is not where the
 * copy sits. See the note on the gradient itself for what the copy actually
 * sits on and what the wash had to become.
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

      {/*
        The wash under the copy, measured rather than eyeballed.

        The old one — half the height, ink/90 falling to ink/55 by 35% — held
        up at 1440x900 and came apart on a short window, which is where the
        client saw it. Two things compound there: the gradient is shorter in
        pixels, so the same copy sits higher up its ramp and gets less of it,
        and the cover crop lands on the bright part of the banner. On Sueño de
        Primavera at 1349x660 the title measured 2.7:1 against white and the
        attribution 3.4:1 — both under the floor, and visibly so.

        So the height is in rem, not per cent. The copy always occupies the
        same 220px above the foot whatever the window does; a wash measured
        as a fraction of the section slides out from under it on a short
        screen, and a wash measured in rem never does. 22rem covers it
        identically at every height — and on a 1080 screen that is a third of
        the image rather than the two thirds a percentage wash needed, which
        matters because the drawing hangs in the middle of these banners.

        Simulated at six viewport sizes across all three banners: object-cover
        at each work's own focus, the copy's real position, contrast measured
        against the 90th percentile of what sits behind each line rather than
        its average. Every line clears, worst case 4.6:1 on that same title.
        Still ink and not black, so it greys the foot of the image.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18rem] md:h-[22rem] bg-[linear-gradient(to_top,rgb(48_48_48/0.95)_0%,rgb(48_48_48/0.80)_35%,rgb(48_48_48/0.42)_70%,transparent_100%)]"
      />

      <div className="absolute inset-x-0 bottom-0">
        <Container width="wide" className="pb-xl md:pb-2xl">
          <h1
            id="obra-titulo"
            className="font-serif text-3xl font-light leading-tight tracking-tight text-fg-strong [text-shadow:0_1px_18px_rgb(0_0_0/0.55)] md:text-4xl lg:text-5xl"
          >
            {work.title}
            {/*
              The status in brackets after the name, at a size that does not
              try to be part of it. Eight of these ten works are in private
              collections and one is being drawn — that is the first thing a
              reader needs to know about the piece they just opened, and until
              now it waited in the sheet a screen further down. The wording is
              WorkMeta's, so the cover and the sheet cannot drift apart.
            */}
            {work.status ? (
              <span className="ml-xs align-middle font-sans text-base font-normal tracking-normal text-fg [text-shadow:0_1px_14px_rgb(0_0_0/0.55)] md:text-lg">
                ({statusLabels[work.status]})
              </span>
            ) : null}
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
