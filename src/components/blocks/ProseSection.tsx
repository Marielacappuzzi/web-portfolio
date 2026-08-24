import { Container, Section } from "@/components/layout/Section";
import type { Ground } from "@/components/layout/Section";
import { QuietLink } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow, Prose, PullQuote } from "@/components/primitives/Type";
import type { ProseBlock } from "@/content/types";

interface ProseSectionProps {
  block: ProseBlock;
  ground?: Ground;
  id?: string;
  headingId?: string;
}

/**
 * Heading on the left, reading column on the right, the sentence to carry away
 * underneath it.
 *
 * The two columns are what keeps "jerarquía clara entre títulos y textos" from
 * being a claim: the display type never shares a measure with the body, so the
 * contrast between them is structural rather than a matter of font size.
 */
export function ProseSection({
  block,
  ground = "paper",
  id,
  headingId,
}: ProseSectionProps) {
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
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={90}>
              <Prose paragraphs={block.paragraphs} />
            </Reveal>

            {block.pullQuote ? (
              <Reveal delay={180} className="mt-xl">
                <PullQuote className="max-w-[32ch]">{block.pullQuote}</PullQuote>
              </Reveal>
            ) : null}

            {block.action ? (
              <Reveal delay={270} className="mt-xl">
                <QuietLink href={block.action.href}>
                  {block.action.label}
                </QuietLink>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
