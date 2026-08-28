import { Container } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import type { AboutPage } from "@/content/types";

interface AboutBannerProps {
  banner: AboutPage["banner"];
}

/**
 * Mariela, once, across the full width.
 *
 * This replaces three separate introductions — an editorial opening, a
 * portrait beside a heading with her name, and a paragraph of biography — that
 * between them said the same thing before the page got to anything else.
 *
 * One photograph, and the layout is in the picture rather than in the grid.
 * She sits in the left two thirds; the wall behind her runs clear from about
 * 60% rightwards, and the text goes there. Not two columns: splitting it would
 * mean cropping her into a panel, and the whole reason this frame works is
 * that it was shot with the space already in it.
 *
 * The type is light because the wall was measured, not guessed: that clear
 * zone reads R129 G112 B95, a relative luminance of 0.17. White lands at
 * 4.8:1 on it and near-black at 3.9:1, so the intuition — pale wall, dark
 * type — is the wrong way round.
 *
 * ON A PHONE the text sits **on** the photograph, not after it.
 *
 * It used to run underneath: the picture ended, then the name started, and the
 * two read as unrelated blocks stacked by accident. Now the photograph is the
 * background of the whole block, the text begins over its lower half, and
 * where the biography runs past the bottom of the image the section's own
 * ground carries it to the end. A gradient does the handover, so there is no
 * visible line where the picture stops — which is what keeps it reading as one
 * composition rather than as an image with a box under it.
 */
export function AboutBanner({ banner }: AboutBannerProps) {
  return (
    <section
      aria-labelledby="mariela-titulo"
      data-ground="chamber"
      /*
        `bg-bg` is the ground the text lands on once the photograph runs out.
        On a wide screen it is never seen: the image covers the whole section.
      */
      className="relative isolate overflow-hidden bg-bg text-fg"
    >
      {/*
        The photograph.

        Absolute on a phone so the type can sit on top of it and then continue
        past it; in normal flow from `lg`, where it sets the height of the
        block and the text is what floats.
      */}
      <div className="absolute inset-x-0 top-0 h-[80svh] lg:static lg:h-auto">
        <picture>
          <source media="(min-width: 1024px)" srcSet={banner.src} />
          <img
            src={banner.mobileSrc}
            alt={banner.alt}
            /* The first thing under the opening, so it is worth fetching early. */
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[52%_28%] lg:aspect-[1920/750] lg:h-auto lg:object-center"
          />
        </picture>

        {/*
          The handover. On a phone the picture fades into the section's ground
          over its bottom third, so the text crosses from one to the other
          without a seam. Off from `lg`, where the wash below does that job.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 via-40% to-transparent lg:hidden"
        />
      </div>

      {/*
        The wash for the wide layout: right to left, gone by 45%. The type
        needs it; the photograph does not, and she is at 20-55% of the frame.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-ink/70 via-ink/35 via-30% to-transparent to-45% lg:block"
      />

      {/*
        The type.

        On a phone it begins 58svh down — past her face and her hands, which
        at 34svh and again at 46svh it was sitting across — and runs on into
        the ground below it. The picture grows to 80svh so there is still
        photograph under the
        opening lines rather than the name landing on the seam. From `lg` it
        is centred in the band, in columns 9-12 of the page's own grid, which
        on a 1920 screen starts it at 61% of the viewport: inside the clear
        zone, and on the same axis as every other section of the site.
      */}
      <div className="relative pb-2xl pt-[58svh] lg:absolute lg:inset-0 lg:flex lg:items-center lg:py-0 lg:pt-0">
        <Container width="wide" className="w-full">
          <div className="lg:grid lg:grid-cols-12">
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <Display as="h2" size="section" id="mariela-titulo" measure={16}>
                  {banner.name}
                </Display>
              </Reveal>

              <Reveal delay={100} className="mt-xs">
                <p className="font-sans text-base leading-snug text-fg-strong">
                  {banner.role}
                </p>
              </Reveal>

              <div className="mt-lg flex flex-col gap-md">
                {banner.bio.map((paragraph, i) => (
                  <Reveal key={i} delay={200 + i * 100}>
                    <p className="max-w-[46ch] font-sans text-sm leading-relaxed text-pretty text-fg">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
