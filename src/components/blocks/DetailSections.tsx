import { Container, Section } from "@/components/layout/Section";
import type { Ground } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { DetailSection } from "@/content/types";
import { cn } from "@/lib/cn";

interface DetailSectionsProps {
  eyebrow: string;
  title: string;
  sections: DetailSection[];
  ground?: Ground;
  id?: string;
  headingId?: string;
}

/**
 * A run of titled prose: the practical half of a page, or a legal document.
 *
 * A section with an empty `title` continues the one above it instead of
 * opening a new rule — which is how a paragraph that belongs to the previous
 * heading stays with it without inheriting a heading of its own.
 */
export function DetailSections({
  eyebrow,
  title,
  sections,
  ground = "paper",
  id,
  headingId,
}: DetailSectionsProps) {
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
            {sections.map((section, i) => (
              <Reveal
                key={`${section.title}-${i}`}
                delay={Math.min(i, 3) * 60}
                className={cn(
                  section.title ? "border-t border-rule pt-lg" : "pt-0",
                  i === 0 && "border-t-0 pt-0",
                  "pb-lg last:pb-0",
                )}
              >
                {section.title ? (
                  <h3 className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
                    {section.title}
                  </h3>
                ) : null}

                <div
                  className={cn(
                    "flex flex-col gap-md",
                    section.title && "mt-md",
                  )}
                >
                  {section.body.map((paragraph, j) => (
                    <p
                      key={j}
                      className="max-w-[62ch] font-sans text-base leading-relaxed text-pretty text-fg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-md flex flex-col gap-2xs">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="font-serif text-lg font-light leading-snug text-fg-strong"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
