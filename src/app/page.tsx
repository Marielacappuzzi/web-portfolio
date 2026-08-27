import { ContactCallout } from "@/components/blocks/ContactCallout";
import { ProcessList } from "@/components/blocks/ProcessList";
import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Type";
import { Artist } from "@/components/home/Artist";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { Hero } from "@/components/home/Hero";
import { WorkGrid } from "@/components/work/WorkGrid";
import {
  getCommissionsPage,
  getFeaturedWorks,
  getGalleryWorks,
  getHome,
} from "@/lib/content";

/**
 * The site, as one continuous read.
 *
 * It used to be five routes with a dropdown listing every work. The
 * restructure makes it a single page in a fixed order — Inicio, Obras, Sobre
 * Mariela, Encargos, Contacto — because a visitor who lands here is deciding
 * whether to commission a portrait, and that decision is one argument, not
 * five errands.
 *
 * What keeps a page of its own: the three works whose story is long enough to
 * carry one. Everything else opens in a lightbox from the gallery.
 *
 * No section repeats an argument made in another. That rule is why the old
 * statement block is gone — it said at length what the hero now says once.
 */
export default async function HomePage() {
  const [content, featured, gallery, commissions] = await Promise.all([
    getHome(),
    getFeaturedWorks(),
    getGalleryWorks(),
    getCommissionsPage(),
  ]);

  return (
    <>
      <Hero content={content.hero} />

      {/*
        Obras — the three flagship pieces first, then the rest of the
        collection. Grouping them is the brief's instruction: the three that
        carry a story lead, and the catalogue follows.
      */}
      <FeaturedWorks content={content.featured} works={featured} />

      {gallery.length > 0 ? (
        <Section ground="paper" rhythm="act" aria-labelledby="coleccion-titulo">
          <Container width="wide">
            <Reveal>
              <Eyebrow as="h2" id="coleccion-titulo">
                La colección
              </Eyebrow>
            </Reveal>

            <WorkGrid works={gallery} className="mt-2xl" />
          </Container>
        </Section>
      ) : null}

      {/* Sobre Mariela — who is behind the work. */}
      <Artist content={content.artist} />

      {/*
        Encargos — the process in four stages, and one ask at the end. The
        practical detail (packing, shipping, payment, FAQ) stays on its own
        page: the brief asks for only the essentials before the enquiry.
      */}
      <ProcessList
        block={commissions.process}
        ground="chamber"
        id="encargos"
        headingId="encargos-titulo"
      />

      <Section ground="chamber" rhythm="none" className="pb-4xl">
        <Container width="wide">
          <Reveal className="flex justify-center">
            <ActionButton href="/encargos">
              Ver todo sobre encargos
            </ActionButton>
          </Reveal>
        </Container>
      </Section>

      {/* Contacto — one ask, at the end. */}
      <ContactCallout content={content.contact} />
    </>
  );
}
