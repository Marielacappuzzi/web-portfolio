import { Container, Section } from "@/components/layout/Section";
import type { Ground } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { AboutPage } from "@/content/types";

interface VisionListProps {
  block: AboutPage["vision"];
  ground?: Ground;
  id?: string;
  headingId?: string;
}

/**
 * How Mariela looks at a subject, as ideas rather than stages.
 *
 * Deliberately unnumbered. The numbered list on /encargos describes what
 * happens to a commission, in order; this describes a way of seeing, which has
 * none. Same practice, two readings — and the two pages stop looking like each
 * other, which was the point of separating them.
 */
export function VisionList({
  block,
  ground = "paper",
  id,
  headingId,
}: VisionListProps) {
  return (
    <Section ground={ground} rhythm="act" id={id} aria-labelledby={headingId}>
      <Container width="wide">
        <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{block.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={90} className="mt-lg">
              <Display id={headingId} measure={20}>
                {block.title}
              </Display>
            </Reveal>

            <Reveal delay={180} className="mt-lg">
              <p className="max-w-[44ch] font-sans text-base leading-relaxed text-pretty text-fg">
                {block.intro}
              </p>
            </Reveal>
          </div>

          <dl className="lg:col-span-6 lg:col-start-7">
            {block.ideas.map((idea, i) => (
              <Reveal
                key={idea.title}
                delay={Math.min(i, 3) * 90}
                className="border-t border-rule py-lg last:border-b"
              >
                <dt className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
                  {idea.title}
                </dt>
                <dd className="mt-2xs max-w-[52ch] font-sans text-sm leading-relaxed text-pretty text-fg">
                  {idea.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
