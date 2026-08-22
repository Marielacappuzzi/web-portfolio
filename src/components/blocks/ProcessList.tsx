import { Container, Section } from "@/components/layout/Section";
import type { Ground } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { ProcessBlock } from "@/content/types";

interface ProcessListProps {
  block: ProcessBlock;
  ground?: Ground;
  id?: string;
  headingId?: string;
}

/**
 * The five stages, as an ordered list of hairlines rather than a row of cards.
 *
 * Used twice with the same data: on /sobre-mi it reads as how Mariela works,
 * on /encargos as what a client can expect. The numbers stay at label size —
 * they orient, they do not decorate.
 */
export function ProcessList({
  block,
  ground = "paper",
  id,
  headingId,
}: ProcessListProps) {
  return (
    <Section ground={ground} rhythm="act" id={id} aria-labelledby={headingId}>
      <Container width="wide">
        <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{block.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={90} className="mt-lg">
              <Display id={headingId}>{block.title}</Display>
            </Reveal>

            <Reveal delay={180} className="mt-lg">
              <p className="max-w-[44ch] font-sans text-base leading-relaxed text-pretty text-fg">
                {block.intro}
              </p>
            </Reveal>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {block.steps.map((step, i) => (
              <Reveal
                key={step.number}
                as="li"
                delay={Math.min(i, 3) * 90}
                className="grid grid-cols-[auto_1fr] gap-x-lg border-t border-rule py-lg last:border-b"
              >
                <span className="pt-1 font-sans text-2xs uppercase tracking-label text-fg-faint">
                  {step.number}
                </span>

                <div>
                  <h3 className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
                    {step.title}
                  </h3>
                  <p className="mt-2xs max-w-[46ch] font-sans text-sm leading-relaxed text-pretty text-fg">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
