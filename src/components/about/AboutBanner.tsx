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
 * ON A PHONE the photograph keeps the top of the block and the words go under
 * it, on the section's own ground.
 *
 * Overlaying them was tried twice and does not work at this width. The text
 * had to start past her face and hands, which left it in the last third of the
 * frame, compressed, and small enough to be uncomfortable — a name, a role and
 * two paragraphs of biography do not fit in a strip. Reading beats atmosphere
 * here: the picture is clean, the biography is at its real size, and a
 * gradient carries the photograph into the ground beneath it so the two still
 * read as one piece rather than as an image with a card under it.
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
        The photograph, in normal flow at every width.

        It is what gives the section its height, so it must never be taken out
        of the flow. Making it `lg:absolute` in the mobile pass collapsed the
        whole banner on a wide screen: with nothing left in flow the section
        had no height, and the layout that had been approved disappeared. On a
        phone the words follow it; from `lg` they float over its right side.
      */}
      <div className="relative">
        <picture>
          <source media="(min-width: 1024px)" srcSet={banner.src} />
          <img
            src={banner.mobileSrc}
            alt={banner.alt}
            /* The first thing under the opening, so it is worth fetching early. */
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-[52%_22%] lg:aspect-[1920/750] lg:object-center"
          />
        </picture>

        {/*
          The handover. The picture fades into the section's ground over its
          bottom quarter, so there is no line where it stops and the text below
          reads as the same piece. Off from `lg`, where the wash to the right
          does that job instead.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink via-ink/60 via-45% to-transparent lg:hidden"
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

        On a phone it follows the picture on the section's own ground, at the
        size the biography deserves. From `lg` it is absolutely placed and
        centred in the band, in columns 9-12 of the page's own grid — on a 1920
        screen that starts it at 61% of the viewport, inside the clear wall and
        on the same axis as every other section of the site. That half is
        exactly as it was approved.
      */}
      <div className="relative -mt-lg pb-2xl lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:items-center lg:py-0">
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
                    <p className="max-w-[46ch] font-sans text-base leading-relaxed text-pretty text-fg lg:text-sm">
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
