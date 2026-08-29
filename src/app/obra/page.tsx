import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import { FeaturedSlider } from "@/components/work/FeaturedSlider";
import { WorkGrid } from "@/components/work/WorkGrid";
import {
  getFeaturedWorks,
  getGalleryWorks,
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
  const [page, featured, gallery] = await Promise.all([
    getWorkIndexPage(),
    getFeaturedWorks(),
    getGalleryWorks(),
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
        <Section
          ground="chamber"
          /*
            `beat`, between the two. `act` stacked three large gaps before the
            reader reached a photograph; `tight` then pulled the heading so
            close to the banner that the two read as one object and the title
            looked like a caption sitting on the picture. This gives the
            heading room on both sides without the section going hollow.
          */
          rhythm="beat"
          aria-labelledby="destacadas-titulo"
        >
          {/*
            The heading keeps the page gutter; the slider sits outside the
            Container so the banners run edge to edge. A full-width photograph
            held inside a 90rem column would be a banner with margins, which
            is the one thing a banner is not.

            Centred, and given air. Ranged left directly above a full-bleed
            photograph it read as that photograph's caption rather than as the
            section's title. In the middle of its own space it is unmistakably
            a heading, and the banner starts on its own.
          */}
          <Container width="wide">
            <Reveal className="flex justify-center">
              {/* Same emphasis as the home, so the two read as one site. */}
              <Display
                as="h2"
                id="destacadas-titulo"
                measure={20}
                className="text-center"
              >
                Obras *destacadas*
              </Display>
            </Reveal>
          </Container>

          {/*
            `fadeTop` because the heading sits on the chamber ground and the
            photograph begins directly under it — a flat #303030 meeting the
            top of a picture in a hard line. The gradient carries one into the
            other. `mt-md` rather than `mt-lg`: with the seam softened the
            heading can sit closer to what it names.
          */}
          <FeaturedSlider works={featured} fadeTop className="mt-xl sm:mt-2xl" />
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

      <ContactCallout content={page.closing} />
    </>
  );
}
