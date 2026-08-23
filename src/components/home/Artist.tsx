import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Figure } from "@/components/primitives/Figure";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow, Prose } from "@/components/primitives/Type";
import type { HomeArtistContent } from "@/content/types";

/**
 * Mariela, introduced before the work.
 *
 * Text left, photograph right — the mirror of /sobre-mi, where the portrait
 * sits on the left. The two pages then never read as the same block repeated,
 * which is the whole reason for the flip.
 *
 * The photograph follows the same principle: she is at her worktable with the
 * charcoal in her hand, the pencils laid out and the reference on screen. A
 * posed portrait would say who she is; this one also says what she does.
 */
export function Artist({ content }: { content: HomeArtistContent }) {
  return (
    <Section ground="paper" rhythm="act" aria-labelledby="artista-titulo">
      <Container width="wide">
        <div className="grid items-center gap-2xl lg:grid-cols-12 lg:gap-x-[5vw]">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={90} className="mt-lg">
              <Display id="artista-titulo" measure={22}>
                {content.title}
              </Display>
            </Reveal>

            <Reveal delay={180} className="mt-xl">
              <Prose paragraphs={content.paragraphs} />
            </Reveal>

            <Reveal delay={270} className="mt-2xl">
              <ActionButton href={content.action.href}>
                {content.action.label}
              </ActionButton>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal variant="image" delay={120}>
              <Figure
                src={content.image.src}
                alt={content.image.alt}
                pendingLabel="Mariela trabajando"
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
