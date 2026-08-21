import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { WorkSelection } from "@/components/home/WorkSelection";
import { getFeaturedWorks, getHome } from "@/lib/content";

/**
 * Home — four sections.
 *
 *   1. Hero              who she is, and the work that opens the site
 *   2. Declaración       what makes her work hers, in two sentences
 *   3. Obra seleccionada the three narrative pieces, as images and names
 *   4. Contacto          one way in
 *
 * The home introduces the universe; it does not explain it. Everything that
 * used to live here — the reasoning, the charcoal, the five stages, the
 * commission detail, the biography, the edition — moved to the page it belongs
 * to. No copy was rewritten or dropped; see docs/PROJECT_CONTEXT.md §8 for the
 * redistribution table.
 *
 * Chamber bookends the page: it opens on the hero and closes on the footer.
 * Everything between is paper, which is where Yulia Bas — the primary visual
 * reference — spends almost all of her site.
 */
export default async function HomePage() {
  const [content, featured] = await Promise.all([
    getHome(),
    getFeaturedWorks(),
  ]);

  return (
    <>
      <Hero content={content.hero} />
      <Statement content={content.statement} />
      <WorkSelection content={content.work} works={featured} />
      <ContactCallout content={content.contact} />
    </>
  );
}
