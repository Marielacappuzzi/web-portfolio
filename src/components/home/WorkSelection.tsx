import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import { WorkGrid } from "@/components/work/WorkGrid";
import type { HomeWorkContent, Work } from "@/content/types";

interface WorkSelectionProps {
  content: HomeWorkContent;
  works: Work[];
}

/**
 * A taste of the catalogue, ahead of the three narrative pieces.
 *
 * This section and "Obras destacadas" below it do different jobs, so they are
 * built differently: this one is a hang — several works at gallery scale, each
 * with its own proportion and its own sheet — while the featured block gives
 * three pieces a shared frame and reads as a sequence.
 *
 * The pieces shown here exclude the featured three, so the home never repeats
 * the same works twice in a row.
 */
export function WorkSelection({ content, works }: WorkSelectionProps) {
  if (works.length === 0) return null;

  return (
    <Section ground="paper" rhythm="act" aria-labelledby="obra-titulo">
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={90} className="mt-lg">
            <Display id="obra-titulo" measure={24} className="mx-auto">
              {content.title}
            </Display>
          </Reveal>
        </div>

        <WorkGrid works={works} className="mt-3xl md:mt-4xl" />

        <Reveal className="mt-3xl flex justify-center">
          <ActionButton href={content.action.href}>
            {content.action.label}
          </ActionButton>
        </Reveal>
      </Container>
    </Section>
  );
}
