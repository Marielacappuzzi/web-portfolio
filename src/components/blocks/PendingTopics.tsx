import { Container, Section } from "@/components/layout/Section";
import { Pending } from "@/components/primitives/Pending";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";

interface PendingTopicsProps {
  eyebrow: string;
  title: string;
  topics: string[];
  /** Why the copy does not exist yet, in one sentence, for whoever reads it. */
  note: string;
  id?: string;
  headingId?: string;
}

/**
 * A section whose structure is decided but whose copy does not exist yet.
 *
 * The brief is explicit: mark what is missing, never invent it. This renders
 * the agreed outline — so the shape of the page is reviewable — with each entry
 * declared as pending. It is the honest alternative to filling a commissions
 * page with plausible turnaround times, or a privacy policy with legal text
 * Mariela could be held to.
 *
 * Every topic here is tracked in docs/CONTENT_PENDING.md.
 */
export function PendingTopics({
  eyebrow,
  title,
  topics,
  note,
  id,
  headingId,
}: PendingTopicsProps) {
  return (
    <Section ground="paper" rhythm="act" id={id} aria-labelledby={headingId}>
      <Container width="wide">
        <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={90} className="mt-lg">
              <Display id={headingId}>{title}</Display>
            </Reveal>

            <Reveal delay={180} className="mt-lg">
              <p className="max-w-[44ch] font-sans text-sm leading-relaxed text-pretty text-fg-muted">
                {note}
              </p>
            </Reveal>
          </div>

          <ul className="lg:col-span-6 lg:col-start-7">
            {topics.map((topic, i) => (
              <Reveal
                key={topic}
                as="li"
                delay={Math.min(i, 3) * 60}
                className="flex flex-wrap items-baseline justify-between gap-x-lg gap-y-2xs border-t border-rule py-md last:border-b"
              >
                <span className="font-serif text-lg font-light leading-snug text-fg-strong">
                  {topic}
                </span>
                <Pending kind="data" />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
