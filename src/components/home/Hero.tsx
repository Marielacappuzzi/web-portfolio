import { Container } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { CoverImage } from "@/components/home/CoverImage";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import type { HeroContent } from "@/content/types";

interface HeroProps {
  content: HeroContent;
}

/**
 * The opening: one photograph, with the sentence set into its left third.
 *
 * The picture is composed for this — Mariela and the drawing hold the right,
 * and the left is bare studio wall. So the type goes back on top of the band
 * rather than under it, which is what a cover is: one image, and the words
 * inside it. Ranged left on the same axis as every other section, because
 * centred type over a photograph has nothing to align to and drifts.
 *
 * `data-ground="chamber"`, and the reason is measured rather than assumed:
 * that left wall reads R122 G97 B76, a relative luminance of 0.14. Dark type
 * on it lands at 3.2:1 and fails; light type reaches 5.5:1 before any veil at
 * all. The previous portada was a pale wall and took the opposite treatment —
 * the ground under the words decides, every time.
 *
 * The veil is `soft` for the same reason. A full one would have worked too,
 * and would have flattened a photograph that was lit warm on purpose. Two
 * thirds of it clears 8:1 and leaves the warmth alone.
 *
 * Below `xl` the type returns to normal flow under the band, on chamber's own
 * ground. The bare wall is 29% of the picture's width, so it only holds a
 * sentence once the viewport is wide enough to make 29% a column; narrower
 * than that the words would run across the sheet she is drawing on. The phone
 * crop has no wall in it at all — it is composed to hold Mariela, her hand and
 * the drawing, and covering the work to make room for words is the one thing
 * this site does not do.
 */
export function Hero({ content }: HeroProps) {
  return (
    <section
      data-ground="chamber"
      aria-labelledby="hero-titulo"
      className="relative isolate text-fg"
    >
      <CoverImage
        src={content.cover?.src ?? null}
        alt={content.cover?.alt ?? ""}
        mobileSrc={content.cover?.mobileSrc}
        focus={content.cover?.focus}
        /*
          The file is 16:9, which is what narrow and mid screens get whole. A
          wide screen takes a 2:1 band out of it, and `focus` decides where
          from: 38% down, so the trim comes mostly off the bottom of the easel
          and leaves the top of the sheet and her hair intact.
        */
        aspect="aspect-[4/5] md:aspect-[16/9] xl:aspect-[2/1]"
        scrim="soft"
        mobileMedia="(min-width: 768px)"
      />

      {/*
        Absolute from `xl` up so the band keeps its exact proportion, and in
        normal flow below it, where the ground colour carries the type instead
        of the photograph.
      */}
      <div className="inset-0 bg-bg px-0 pb-2xl pt-xl xl:absolute xl:flex xl:items-end xl:bg-transparent xl:pb-3xl xl:pt-0">
        {/*
          `full`, not `wide`. The sections below sit in a 90rem column centred
          in the viewport; on a 1920 screen that starts them 304px in, while
          the bare wall in the photograph ends at 557px. Aligning the type to
          the page instead of to the picture would leave it 253px to live in,
          and every wider screen makes that worse — the container stops growing
          and the picture does not. Ranging it to the image's own left edge is
          the only measure that scales with what it sits on.
        */}
        <Container width="full" className="w-full">
          <div className="max-w-[46ch] xl:max-w-[min(46ch,22vw)]">
            <Reveal>
              {/*
                `measure` holds the sentence to three or four lines inside the
                left third of the picture. Wider and it would run across the
                sheet Mariela is drawing on; the italic on *historia entera*
                comes from Copy.md and Display resolves it.
              */}
              <Display as="h1" size="cover" id="hero-titulo" measure={18}>
                {content.title}
              </Display>
            </Reveal>

            <Reveal delay={150} className="mt-lg">
              <p className="max-w-[46ch] font-sans text-base leading-relaxed text-pretty text-fg">
                {content.description}
              </p>
            </Reveal>

            <Reveal
              delay={300}
              className="mt-lg-plus flex flex-wrap items-center gap-x-lg gap-y-md"
            >
              <ActionButton href={content.primaryAction.href}>
                {content.primaryAction.label}
              </ActionButton>
              <QuietLink href={content.secondaryAction.href}>
                {content.secondaryAction.label}
              </QuietLink>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
