import { Container, Section } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { Ground } from "@/components/layout/Section";
import type { HomeContactContent } from "@/content/types";

interface ContactCalloutProps {
  content: HomeContactContent;
  ground?: Ground;
  headingId?: string;
}

/**
 * The closing invitation. Yulia Bas's ENQUIRIES block, in Mariela's voice: one
 * way in, one quiet alternative, no pricing and no urgency.
 *
 * Shared by the home, /obra and /encargos so the site closes the same way.
 *
 * The width cap lives on the heading itself, never on a wrapper. `ch` resolves
 * against the element's own font size, so a cap set on a sans-serif container
 * produced a quarter of the intended width and broke this headline into one
 * word per line at display size.
 */
export function ContactCallout({
  content,
  ground = "paper",
  headingId = "contacto-titulo",
}: ContactCalloutProps) {
  return (
    <Section
      ground={ground}
      rhythm="act"
      aria-labelledby={headingId}
      /*
       * The closing invitation reads as a coda, not as the tail of whatever
       * came before it. On paper over paper there is no edge between them, so
       * a full rule and extra breath do the cutting that a change of ground
       * would do elsewhere.
       */
      className="border-t border-rule"
    >
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={90} className="mt-lg">
            <Display id={headingId} measure={22} className="mx-auto">
              {content.title}
            </Display>
          </Reveal>

          <Reveal delay={180} className="mt-xl">
            <p className="mx-auto max-w-[56ch] font-sans text-base leading-relaxed text-pretty text-fg">
              {content.paragraph}
            </p>
          </Reveal>

          <Reveal
            delay={270}
            className="mt-2xl flex flex-wrap items-baseline justify-center gap-x-xl gap-y-md"
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
    </Section>
  );
}
