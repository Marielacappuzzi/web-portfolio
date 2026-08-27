import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import { FeaturedRow } from "@/components/work/FeaturedRow";
import { WorkGrid } from "@/components/work/WorkGrid";
import {
  getFeaturedWorks,
  getGalleryWorks,
  getHome,
  getWorkIndexPage,
} from "@/lib/content";

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
  const [page, featured, gallery, home] = await Promise.all([
    getWorkIndexPage(),
    getFeaturedWorks(),
    getGalleryWorks(),
    getHome(),
  ]);

  return (
    <>
      <PageHeader
        heading={{ eyebrow: page.eyebrow, title: page.title }}
        lead={page.description}
        /* The chamber section below already draws the edge. */
        rule={false}
      />

      {/*
        Two blocks, and the difference between them is legible before a word
        is read. The three flagship pieces sit together on the darker ground —
        they are the ones with a page to go to — and the catalogue follows on
        paper. Interleaved, as they were, nothing told a visitor which was
        which.
      */}
      {featured.length > 0 ? (
        <Section ground="chamber" rhythm="act" aria-labelledby="destacadas-titulo">
          <Container width="wide">
            <Reveal>
              {/* Same emphasis as the home, so the two read as one site. */}
              <Display as="h2" id="destacadas-titulo" measure={20}>
                Obras *destacadas*
              </Display>
            </Reveal>

            <FeaturedRow works={featured} className="mt-2xl" />
          </Container>
        </Section>
      ) : null}

      <Section ground="paper" rhythm="act" aria-labelledby="todas-titulo">
        <Container width="wide">
          <Reveal>
            <Display as="h2" id="todas-titulo" measure={20}>
              Todas las obras
            </Display>
          </Reveal>

          {gallery.length > 0 ? (
            <WorkGrid works={gallery} className="mt-2xl" />
          ) : (
            <Reveal className="mt-2xl block">
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
