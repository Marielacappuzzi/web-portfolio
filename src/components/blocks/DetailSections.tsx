import { Container, Section } from "@/components/layout/Section";
import type { Ground } from "@/components/layout/Section";
import { Disclosure } from "@/components/primitives/Disclosure";
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
  /*
    Fold each untitled section into the panel above it. The formats block is
    written as two entries — a heading with its list, then two more paragraphs
    — and only the first carries a title.
  */
  const groups = sections.reduce<
    { title: string; sections: typeof sections }[]
  >((acc, section) => {
    if (section.title) {
      acc.push({ title: section.title, sections: [section] });
    } else if (acc.length > 0) {
      acc[acc.length - 1].sections.push(section);
    }

    return acc;
  }, []);

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
            {/*
              Eight headings of practical copy, collapsed. Laid out in full it
              was a wall the reader had to scroll past to reach anything else,
              and each heading answers a separate question — nobody needs all
              eight at once.

              A section with no title is a continuation of the one above it
              (the formats block is split in two), so it folds into that panel
              rather than becoming a disclosure with nothing to press.
            */}
            {groups.map((group, i) => (
              <Reveal key={`${group.title}-${i}`} delay={Math.min(i, 3) * 60}>
                <Disclosure summary={group.title}>
                  {group.sections.map((section, s) => (
                    <div key={s} className={cn(s > 0 && "mt-md")}>
                      <div className="flex flex-col gap-md">
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
                    </div>
                  ))}
                </Disclosure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
