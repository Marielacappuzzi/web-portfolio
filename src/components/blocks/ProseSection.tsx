import type { ReactNode } from "react";
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
  /**
   * Rendered at the foot of the reading column. Anything that belongs to the
   * text rather than to the page — a video, a plate — goes here so it shares
   * the column instead of sitting centred underneath, which would give the
   * sticky heading nothing to travel beside.
   */
  aside?: ReactNode;
}

/**
/**
 * Heading on the left, reading column on the right, the sentence to carry away
 * underneath it.
 *
 * The two columns are what keeps "jerarquía clara entre títulos y textos" from
 * being a claim: the display type never shares a measure with the body, so the
 * contrast between them is structural rather than a matter of font size.
 *
 * From `lg` the heading sticks while its own column scrolls past, so the title
 * stays with the paragraphs that belong to it instead of leaving the screen at
 * the first sentence. It is CSS `position: sticky` rather than a scroll
 * animation: no JavaScript to fail, no jitter against Lenis, and it simply
 * does not apply below `lg`, where one column has nothing to stick beside.
 */
export function ProseSection({
  block,
  ground = "paper",
  id,
  headingId,
  aside,
}: ProseSectionProps) {
  return (
    <Section ground={ground} rhythm="act" id={id} aria-labelledby={headingId}>
      <Container width="wide">
        <div className="grid gap-2xl lg:grid-cols-12 lg:items-start lg:gap-x-[4vw]">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
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

            {aside ? <div className="mt-xl">{aside}</div> : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
