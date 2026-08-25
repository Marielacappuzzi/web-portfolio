import { Container, Section } from "@/components/layout/Section";
import { Pending } from "@/components/primitives/Pending";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";
import type { LegalPage, SiteContent } from "@/content/types";

interface LegalDocumentProps {
  page: LegalPage;
  site: SiteContent;
}

/**
 * A legal document, set to be read rather than skimmed.
 *
 * One column at the reading measure — legal text is the one place on this site
 * where a wide composition would actively hurt, because these paragraphs are
 * scanned for a specific clause and a long line makes that harder.
 *
 * Sections listed in `contactSectionIndexes` need the contact address. While
 * `site.email` is null they show a declared marker: an invented mailbox in a
 * privacy policy is a promise nobody can keep.
 */
export function LegalDocument({ page, site }: LegalDocumentProps) {
  const needsAddress = new Set(page.contactSectionIndexes ?? []);

  return (
    <Section ground="paper" rhythm="act" aria-labelledby="legal-titulo">
      <Container width="text">
        <Reveal>
          <p className="font-sans text-2xs uppercase tracking-label text-fg-faint">
            {page.updated}
          </p>
        </Reveal>

        <div className="mt-2xl flex flex-col gap-md">
          {page.intro.map((paragraph, i) => (
            <Reveal key={i} delay={90}>
              <p className="font-sans text-lg leading-relaxed text-pretty text-fg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-3xl">
          {page.sections.map((section, i) => (
            <Reveal
              key={`${section.title}-${i}`}
              className={cn(
                section.title ? "border-t border-rule pt-lg" : "pt-0",
                "pb-lg last:pb-0",
              )}
            >
              {section.title ? (
                <h2 className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
                  {section.title}
                </h2>
              ) : null}

              <div
                className={cn("flex flex-col gap-md", section.title && "mt-md")}
              >
                {section.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="font-sans text-base leading-relaxed text-pretty text-fg"
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
                      className="font-sans text-base leading-relaxed text-fg before:mr-2xs before:text-fg-faint before:content-['—']"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {needsAddress.has(i) ? (
                <div className="mt-md">
                  {site.email ? (
                    <a
                      href={`mailto:${site.email}`}
                      className="font-sans text-base text-fg-strong underline decoration-rule decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-current"
                    >
                      {site.email}
                    </a>
                  ) : (
                    <Pending kind="data" detail="Correo de contacto" />
                  )}
                </div>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
