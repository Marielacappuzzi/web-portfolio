import { Container } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { CoverImage } from "@/components/home/CoverImage";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { HeroContent } from "@/content/types";
import { withEmphasis } from "@/lib/emphasis";

interface HeroProps {
  content: HeroContent;
  /** From site.ts, so the name is never written twice. */
  name: string;
  role: string;
}

/**
 * The opening: a photograph of Mariela working, then her name.
 *
 * The type is under the band, not over it. The cover is now the charcoal
 * itself — the horse fills the left half, exactly where the sentence used to
 * sit — and putting words there would mean veiling the drawing to make them
 * legible. Below the band the page is white, the name has as much size as it
 * wants, and nothing is laid over the work. It is also the order Mariela
 * described: the photograph first, then who made it.
 *
 * Her name is the h1. On an artist's home it is the true heading, and it was
 * previously set as a label two sizes smaller than a sentence about the work.
 */
export function Hero({ content, name, role }: HeroProps) {
  return (
    <section
      data-ground="paper"
      aria-labelledby="hero-titulo"
      className="relative isolate text-fg"
    >
      <CoverImage
        src={content.cover?.src ?? null}
        alt={content.cover?.alt ?? ""}
        mobileSrc={content.cover?.mobileSrc}
        focus={content.cover?.focus}
        scrim="none"
      />

      <Container width="wide" className="pb-3xl pt-2xl sm:pt-3xl">
        <Reveal>
          {/*
            `hero`, the top of the scale — up to 5.75rem. `cover` was made
            deliberately smaller so a sentence could sit beside a drawing
            without towering over it; a name under a photograph has no such
            neighbour, and this one is meant to be the first thing read.
          */}
          <Display as="h1" size="hero" id="hero-titulo" measure={18}>
            {name}
          </Display>
        </Reveal>

        <Reveal delay={120} className="mt-md">
          <Eyebrow>{role}</Eyebrow>
        </Reveal>

        <div className="mt-2xl max-w-[52ch]">
          <Reveal delay={240}>
            {/*
              The sentence carries *emphasis* markup from Copy.md, which the
              Display component would have resolved for it. Demoted to a
              paragraph — the name is the heading now — it has to resolve its
              own, or the asterisks print.
            */}
            <p className="font-serif text-xl font-light leading-snug text-pretty text-fg-strong">
              {withEmphasis(content.title)}
            </p>
          </Reveal>

          <Reveal delay={360} className="mt-lg">
            <p className="font-sans text-base leading-relaxed text-pretty text-fg">
              {content.description}
            </p>
          </Reveal>

          <Reveal
            delay={480}
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
    </section>
  );
}
