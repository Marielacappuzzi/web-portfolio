import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getHome, getWorkIndexPage, getWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Obra",
  description:
    "Obras personales, retratos por encargo y piezas nacidas de vínculos, recuerdos e ideas que encontraron una forma de ser contadas.",
};

/**
 * /obra — one gallery, as Mariela asked for this first stage.
 *
 * No filters and no categories yet, because there are too few pieces for them
 * to mean anything. The data model already carries kind, status and order, so
 * adding them later is a query change rather than a rebuild.
 */
export default async function WorkIndexPage() {
  const [page, works, home] = await Promise.all([
    getWorkIndexPage(),
    getWorks(),
    getHome(),
  ]);

  return (
    <>
      <PageHeader
        heading={{ eyebrow: page.eyebrow, title: page.title }}
        lead={page.description}
      />

      <Section ground="paper" rhythm="beat">
        <Container width="wide">
          {works.length > 0 ? (
            <WorkGrid works={works} />
          ) : (
            <Reveal>
              <p className="max-w-[52ch] font-sans text-base leading-relaxed text-fg-muted">
                {page.emptyMessage}
              </p>
            </Reveal>
          )}
        </Container>
      </Section>

      <ContactCallout content={home.contact} />
    </>
  );
}
