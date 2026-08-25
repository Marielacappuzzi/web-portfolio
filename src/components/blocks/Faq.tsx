import { Container, Section } from "@/components/layout/Section";
import type { Ground } from "@/components/layout/Section";
import { Disclosure } from "@/components/primitives/Disclosure";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { FaqItem } from "@/content/types";

interface FaqProps {
  eyebrow: string;
  title: string;
  items: FaqItem[];
  ground?: Ground;
  id?: string;
  headingId?: string;
}

/**
 * Frequently asked questions, as native disclosures.
 *
 * They open on a curve rather than in one frame — see Disclosure for why that
 * meant leaving `<details>` behind, and what it cost.
 *
 * The marker is a hairline cross that becomes a minus when open: the same 1px
 * weight as every rule on the site, rather than a chevron borrowed from an
 * interface kit.
 */
export function Faq({
  eyebrow,
  title,
  items,
  ground = "paper",
  id,
  headingId,
}: FaqProps) {
  if (items.length === 0) return null;

  return (
    <Section ground={ground} rhythm="act" id={id} aria-labelledby={headingId}>
      <Container width="wide">
        <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={90} className="mt-lg">
              <Display id={headingId} measure={18}>
                {title}
              </Display>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {items.map((item, i) => (
              <Reveal key={item.question} delay={Math.min(i, 3) * 90}>
                <Disclosure summary={item.question}>
                  <div className="flex flex-col gap-md">
                    {item.answer.map((paragraph, j) => (
                      <p
                        key={j}
                        className="max-w-[62ch] font-sans text-base leading-relaxed text-pretty text-fg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Disclosure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
