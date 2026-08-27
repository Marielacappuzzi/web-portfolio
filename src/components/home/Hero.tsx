import { Container } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { CoverImage } from "@/components/home/CoverImage";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import type { HeroContent } from "@/content/types";

interface HeroProps {
  content: HeroContent;
  /** From site.ts, so the site says who she is in exactly one place. */
  name: string;
  /** "Artista visual especializada en carboncillo." */
  specialty: string;
}

/**
 * The opening: one photograph, with who she is set into its left third.
 *
 * Three lines, in this order and no other:
 *
 *     Mariela Crapuzzi
 *     Artista visual especializada en carboncillo
 *     what that means, in one sentence
 *
 * It used to open on "Una mirada puede contener una historia entera" — a good
 * line, and the wrong first thing to say. A visitor who lands here does not yet
 * know whose site this is or what is made on it, and a sentence about looking
 * answers neither. The line is still on the page; it sits over the three works
 * two sections down, where there is something for it to describe.
 *
 * `data-ground="chamber"`, measured rather than assumed: the bare wall the type
 * sits on reads R122 G97 B76, a relative luminance of 0.14. Dark type on it
 * lands at 3.2:1 and fails; light type reaches 5.5:1 before any veil. The veil
 * is `soft` for the same reason — a full one cleared the same bar and flattened
 * a photograph that was lit warm on purpose. As built, the name is at 8.6:1 and
 * the paragraph at 5.8:1.
 *
 * Below `xl` the type returns to normal flow under the band. The bare wall is
 * 29% of the picture's width, which is not a column until the viewport is wide
 * enough to make it one; narrower than that the words would run across the
 * sheet she is drawing on. The phone crop has no wall in it at all — it is
 * composed to hold Mariela, her hand and the drawing.
 */
export function Hero({ content, name, specialty }: HeroProps) {
  return (
    <section
      data-ground="chamber"
      aria-labelledby="hero-titulo"
      /*
        `bg-bg` on the section, not only on the flow container. On `xl` the type
        floats over the band with no ground of its own; if a short window ever
        pushed it past the bottom edge, light type would land on the white
        section below. This makes that impossible rather than unlikely.
      */
      className="relative isolate bg-bg text-fg"
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
          and leaves the top of the sheet and her hair intact. `min-h` keeps a
          wide, short window from squeezing the band below the height the type
          needs.
        */
        aspect="aspect-[4/5] md:aspect-[16/9] xl:aspect-[2/1] xl:min-h-[34rem]"
        scrim="soft"
        mobileMedia="(min-width: 768px)"
      />

      {/*
        Absolute from `xl` up so the band keeps its exact proportion, and in
        normal flow below it, where the ground colour carries the type instead
        of the photograph.

        `xl:pt-24` clears the fixed header — 80px at that width — so nothing in
        the block can ever sit behind it, however short the window.
      */}
      <div className="inset-0 bg-bg px-0 pb-2xl pt-xl xl:absolute xl:flex xl:items-end xl:bg-transparent xl:pb-3xl xl:pt-24">
        {/*
          `full`, not `wide`. The sections below sit in a 90rem column centred
          in the viewport; on a 1920 screen that starts them 304px in, while
          the bare wall in the photograph ends at 557px. Aligning the type to
          the page instead of to the picture would leave it 253px to live in,
          and every wider screen makes that worse — the container stops growing
          and the picture does not.
        */}
        <Container width="full" className="w-full">
          <div className="max-w-[46ch] xl:max-w-[min(46ch,22vw)]">
            <Reveal>
              {/*
                `cover`, not `hero`. The top of the scale is 92px, and 92px in
                a 282px column breaks "Crapuzzi" onto a line of its own. The
                name is the largest thing on the screen either way.
              */}
              <Display as="h1" size="cover" id="hero-titulo" measure={18}>
                {name}
              </Display>
            </Reveal>

            <Reveal delay={100} className="mt-sm">
              {/*
                Not an Eyebrow. Her specialty is the second thing the site says
                and the answer to "what does she do" — it deserves to be read,
                not set at 11px in letter-spaced capitals like a section label.
              */}
              <p className="font-sans text-base leading-normal text-fg-strong">
                {specialty}
              </p>
            </Reveal>

            <Reveal delay={220} className="mt-lg">
              <p className="max-w-[46ch] font-sans text-base leading-relaxed text-pretty text-fg">
                {content.description}
              </p>
            </Reveal>

            <Reveal
              delay={340}
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
