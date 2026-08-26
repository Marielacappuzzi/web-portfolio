import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Artist } from "@/components/home/Artist";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { getFeaturedWorks, getHome, getSite } from "@/lib/content";

/**
 * Home — six sections.
 *
 *   1. Hero              the work that opens the site
 *   2. Declaración       what makes her work hers, in two sentences
 *   3. La artista        who is behind that gaze
 *   4. Obra seleccionada a taste of the catalogue
 *   5. Obras destacadas  the three narrative pieces
 *   6. Contacto          one way in
 *
 * The order is the point: understand how Mariela looks, then meet the person
 * doing the looking, and only then explore the work. She used to arrive after
 * a long manifesto, which is why the statement is now compact — it keeps its
 * conceptual weight without delaying her entrance.
 */
export default async function HomePage() {
  const [content, featured, site] = await Promise.all([
    getHome(),
    getFeaturedWorks(),
    getSite(),
  ]);

  return (
    <>
      <Hero content={content.hero} name={site.name} role={site.role} />
      <Statement content={content.statement} />
      <Artist content={content.artist} />
      <FeaturedWorks content={content.featured} works={featured} />
      <ContactCallout content={content.contact} />
    </>
  );
}
