import { Artist } from "@/components/home/Artist";
import { Commissions } from "@/components/blocks/Commissions";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { Hero } from "@/components/home/Hero";
import { getFeaturedWorks, getHome, getSite } from "@/lib/content";

/**
 * Home — the whole tour, in four blocks.
 *
 *   1. Hero            who she is, what she does, and two ways on
 *   2. Obras           the three flagship pieces        #obras
 *   3. Sobre Mariela   who made them                    #sobre-mariela
 *   4. Encargos        what can be asked for, and how   #encargos
 *
 * Somebody who reads only this page should leave knowing all of it. The
 * internal pages still exist and go deeper; none of them has to be visited for
 * the project to make sense.
 *
 * What changed, and why it matters more than the order: the work used to
 * arrive fourth, after a manifesto, an artist statement and a section about
 * how Mariela looks at things. Three blocks of reasoning about seeing, before
 * a single drawing. Obras is now the section immediately under the hero,
 * because it is what a visitor came for and the best argument the site has.
 *
 * The "Declaración" block is gone entirely, and so is the contact block that
 * used to close the page — see the notes in content/home.ts. The home ends on
 * the one ask the site exists for.
 */
export default async function HomePage() {
  const [content, featured, site] = await Promise.all([
    getHome(),
    getFeaturedWorks(),
    getSite(),
  ]);

  return (
    <>
      <Hero content={content.hero} name={site.name} specialty={site.role} />
      <FeaturedWorks content={content.featured} works={featured} />
      <Artist content={content.artist} />
      <Commissions content={content.commissions} />
    </>
  );
}
