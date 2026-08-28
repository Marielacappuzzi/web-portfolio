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
 * type — is the wrong way round. The wash is a single soft gradient from the
 * right edge, and it stops short of her: at 45% it is already transparent, so
 * nothing is laid over her face, her hands or the sheet she is signing.
 *
 * Below `lg` the picture and the text separate. A phone is 0.64:1 with the
 * portrait file, which has no clear wall left in it once she fills the frame,
 * and holding a name, a role and two paragraphs over that would be exactly
 * the "caja blanca pesada" the brief rules out. The photograph runs full
 * width, the text sits under it on the page's own ground.
 */
export function AboutBanner({ banner }: AboutBannerProps) {
  return (
    <section
      aria-labelledby="mariela-titulo"
      data-ground="chamber"
      className="relative isolate bg-bg text-fg"
    >
      {/*
        Two files. 1920 x 750 is 2.56:1 and on a phone that is a letterbox
        slot; the 960 x 1500 file is composed for the narrow shape instead of
        cut down to it. `<picture>` fetches only the one it uses.
      */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={banner.src} />
        <img
          src={banner.mobileSrc}
          alt={banner.alt}
          /* The first thing under the opening, so it is worth fetching early. */
          fetchPriority="high"
          decoding="async"
          className="aspect-[960/1500] w-full object-cover object-[50%_30%] sm:aspect-[16/9] lg:aspect-[1920/750] lg:object-center"
        />
      </picture>

      {/*
        The wash. Right to left, and gone by 45% — the type needs it, the
        photograph does not, and she is at 20-55% of the frame.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-ink/70 via-ink/35 via-30% to-transparent to-45% lg:block"
      />

      {/*
        Absolute from `lg` up, in normal flow below it. The text column sits in
        columns 9-12 of the page's own grid, which on a 1920 screen starts it
        at 61% of the viewport — inside the clear zone, and on the same axis as
        every other section of the site rather than floating free of the page.
      */}
      <div className="bg-bg pb-2xl pt-xl lg:absolute lg:inset-0 lg:flex lg:items-center lg:bg-transparent lg:py-0">
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
