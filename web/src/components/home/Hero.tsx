import { Container, Section } from "@/components/layout/Section";
import { ActionLink, QuietLink } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { ScrollZoom } from "@/components/primitives/ScrollZoom";
import { Display, Eyebrow } from "@/components/primitives/Type";
import { ArtworkFrame } from "@/components/work/ArtworkFrame";
import type { HeroContent, Work } from "@/content/types";

interface HeroProps {
  content: HeroContent;
  work: Work | null;
}

/**
 * The opening: one band of work across the full width, then silence, then the
 * sentence.
 *
 * The previous version put the type on a white panel floating over a black
 * section — three blocks arguing with each other. This one has no dark ground
 * and nothing overlapping: the only black on the page is the charcoal itself,
 * which is the point. The page holds the work; it does not compete with it.
 *
 * Everything after the band is centred on a narrow measure with a great deal
 * of air around it. That restraint is where the delicacy comes from — not from
 * ornament, which the brief rules out.
 */
export function Hero({ content, work }: HeroProps) {
  return (
    <Section
      ground="paper"
      rhythm="none"
      className="pb-4xl pt-16 md:pt-20"
      aria-labelledby="hero-titulo"
    >
      {work ? (
        <Reveal variant="image" className="block w-full">
          <ScrollZoom>
            <ArtworkFrame
              work={work}
              bare
              priority
              aspect="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
              focus="50% 26%"
              sizes="100vw"
            />
          </ScrollZoom>
        </Reveal>
      ) : null}

      <Container width="text" className="mt-3xl text-center md:mt-4xl">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={120} className="mt-lg">
          <Display
            as="h1"
            size="hero"
            id="hero-titulo"
            measure={18}
            className="mx-auto"
          >
            {content.title}
          </Display>
        </Reveal>

        <Reveal delay={240} className="mt-xl">
          <p className="mx-auto max-w-[54ch] font-sans text-lg leading-relaxed text-pretty text-fg">
            {content.description}
          </p>
        </Reveal>

        <Reveal
          delay={360}
          className="mt-2xl flex flex-wrap items-baseline justify-center gap-x-xl gap-y-md"
        >
          <ActionLink href={content.primaryAction.href}>
            {content.primaryAction.label}
          </ActionLink>
          <QuietLink href={content.secondaryAction.href}>
            {content.secondaryAction.label}
          </QuietLink>
        </Reveal>
      </Container>
    </Section>
  );
}
