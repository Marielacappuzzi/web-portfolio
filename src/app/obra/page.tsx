import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkCatalogue } from "@/components/work/WorkCatalogue";
import {
  getFeaturedWorks,
  getHome,
  getRestOfCatalogue,
  getWorkIndexPage,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Obras personales, retratos por encargo y piezas nacidas de vínculos, recuerdos e ideas que encontraron una forma de ser contadas.",
};

/**
 * /obra — one gallery, flagships first.
 *
 * Every piece opens now. Two of them lead to a page of their own; the other
 * eight open in the lightbox, at the size of the screen, with their label
 * beside them. Before this they were photographs you could look at and not
 * enlarge, which is a strange thing for a gallery to be.
 *
 * No filters and no categories yet — there are too few pieces for them to mean
 * anything. The data model already carries kind, status and order, so adding
 * them later is a query change rather than a rebuild.
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

      <WorkCatalogue
        featured={featured}
        rest={rest}
        featuredEyebrow={page.featuredEyebrow}
        restEyebrow={page.restEyebrow}
        emptyMessage={page.emptyMessage}
      />

      <ContactCallout content={home.contact} />
    </>
  );
}
