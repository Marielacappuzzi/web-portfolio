import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Type";
import { WorkGrid } from "@/components/work/WorkGrid";
import {
  getFeaturedWorks,
  getHome,
  getRestOfCatalogue,
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
  const [page, featured, rest, home] = await Promise.all([
    getWorkIndexPage(),
    getFeaturedWorks(),
    getRestOfCatalogue(),
    getHome(),
  ]);

  return (
    <>
      <PageHeader
        heading={{ eyebrow: page.eyebrow, title: page.title }}
        lead={page.description}
      />

      {/*
        The three flagships, grouped and on their own ground.
        They were mixed into the same grid as everything else, which meant the
        site's one real hierarchy — these three carry the argument, the rest is
        the catalogue — was invisible. A slightly lighter ground separates them
        without raising the contrast enough to read as a different site.
      */}
      {featured.length > 0 ? (
        <Section
          ground="paper-bright"
          rhythm="act"
          aria-labelledby="destacadas-titulo"
        >
          <Container width="wide">
            <Reveal>
              <Eyebrow as="h2" id="destacadas-titulo">
                {page.featuredEyebrow}
              </Eyebrow>
            </Reveal>

            <WorkGrid works={featured} className="mt-2xl" />
          </Container>
        </Section>
      ) : null}

      <Section ground="paper" rhythm="act" aria-labelledby="todas-titulo">
        <Container width="wide">
          <Reveal>
            <Eyebrow as="h2" id="todas-titulo">
              {page.restEyebrow}
            </Eyebrow>
          </Reveal>

          {rest.length > 0 ? (
            <WorkGrid works={rest} className="mt-2xl" />
          ) : (
            <Reveal className="mt-2xl">
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
