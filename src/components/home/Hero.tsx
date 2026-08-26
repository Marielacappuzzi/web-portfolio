import { Container } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { CoverImage } from "@/components/home/CoverImage";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { HeroContent } from "@/content/types";

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
          <Display as="h1" size="cover" id="hero-titulo" measure={14}>
            {name}
          </Display>
        </Reveal>

        <Reveal delay={120} className="mt-md">
          <Eyebrow>{role}</Eyebrow>
        </Reveal>

        <div className="mt-2xl max-w-[52ch]">
          <Reveal delay={240}>
            <p className="font-serif text-xl font-light leading-snug text-pretty text-fg-strong">
              {content.title}
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
