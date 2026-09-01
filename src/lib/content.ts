import { home } from "@/content/home";
import { about } from "@/content/pages/about";
import { availability } from "@/content/pages/availability";
import { commissions } from "@/content/pages/commissions";
import { contact } from "@/content/pages/contact";
import { privacy, terms } from "@/content/pages/legal";
import { workIndex } from "@/content/pages/work-index";
import { site } from "@/content/site";
import { works } from "@/content/works";
import type {
  AboutPage,
  CommissionsPage,
  ContactPage,
  HomeContent,
  LegalPage,
  SiteContent,
  Work,
  WorkIndexPage,
} from "@/content/types";

/**
 * The only module that knows where content comes from.
 *
 * Accessors are async on purpose. Today they resolve static TypeScript; when
 * the admin panel lands they will query Supabase. Consumers are Server
 * Components that already `await`, so nothing else has to change.
 */

const byOrder = (a: Work, b: Work) => a.order - b.order;

/* ----------------------------------------------------------------- site --- */

export async function getSite(): Promise<SiteContent> {
  return site;
}

/* ---------------------------------------------------------------- pages --- */

export async function getHome(): Promise<HomeContent> {
  return home;
}

export async function getWorkIndexPage(): Promise<WorkIndexPage> {
  return workIndex;
}

export async function getAboutPage(): Promise<AboutPage> {
  return about;
}

export async function getCommissionsPage(): Promise<CommissionsPage> {
  return commissions;
}

export async function getContactPage(): Promise<ContactPage> {
  return contact;
}

/** The enquiry sent from a work's own page. See content/pages/availability. */
export async function getAvailabilityForm(): Promise<ContactPage> {
  return availability;
}

export async function getPrivacyPage(): Promise<LegalPage> {
  return privacy;
}

export async function getTermsPage(): Promise<LegalPage> {
  return terms;
}

/* ---------------------------------------------------------------- works --- */

export async function getWorks(): Promise<Work[]> {
  return [...works].sort(byOrder);
}

export async function getWork(slug: string): Promise<Work | null> {
  return works.find((work) => work.slug === slug) ?? null;
}

/**
 * The three narrative pieces, in the order origin → interpretation → a voice
 * of her own. That sequence is not the gallery order, so it has its own field.
 */
export async function getFeaturedWorks(): Promise<Work[]> {
  return works
    .filter((work) => work.featured)
    .sort((a, b) => (a.featuredOrder ?? a.order) - (b.featuredOrder ?? b.order));
}

/** Commissioned pieces with a photograph — the evidence on /encargos. */
/**
 * The catalogue minus the flagship pieces.
 *
 * The home groups the three that carry a story first, then everything else.
 * Listing a flagship twice on one page would read as a mistake rather than as
 * emphasis, so this excludes them.
 */
export async function getGalleryWorks(): Promise<Work[]> {
  return works.filter((work) => !work.featured).sort(byOrder);
}

export async function getCommissionedWorks(limit = 4): Promise<Work[]> {
  return works
    .filter((work) => work.kind === "commission" && work.image)
    .sort(byOrder)
    .slice(0, limit);
}

/**
 * Commissions filmed in progress, for the process block on /encargos.
 *
 * Pieces with an editorial page are excluded: their clip already lives there,
 * and showing the same footage twice makes the site look like it is padding.
 */
export async function getCommissionVideos(): Promise<Work[]> {
  return works
    .filter(
      (work) =>
        work.kind === "commission" &&
        (work.processVideos?.length ?? 0) > 0 &&
        !work.hasEditorialPage,
    )
    .sort(byOrder);
}

/**
 * The gallery selection shown on the home, above the featured block.
 *
 * Featured pieces are excluded: they get their own section directly below, and
 * showing the same three works twice in a row would make the home look like it
 * is repeating itself. This is where curation happens as the catalogue grows —
 * not in the component.
 */
export async function getGallerySelection(limit = 4): Promise<Work[]> {
  return works
    .filter((work) => !work.featured)
    .sort(byOrder)
    .slice(0, limit);
}

/** Works that get their own editorial page — drives generateStaticParams. */
export async function getEditorialWorks(): Promise<Work[]> {
  return works.filter((work) => work.hasEditorialPage).sort(byOrder);
}

/**
 * The two pieces either side of this one, in the flagship sequence.
 *
 * El Rescate, then Bajo su Protección, then Sueño de Primavera — which is
 * `featuredOrder`, not `order`. Sorting by `order` put them at 1, 9 and 10 and
 * gave "siguiente" the catalogue's sequence instead of the narrative one.
 *
 * The run wraps, so the last piece leads back to the first: an editorial page
 * with nowhere to go is a dead end, and the reader has to reach for the menu.
 */
export async function getWorkNeighbours(
  slug: string,
): Promise<{ previous: Work | null; next: Work | null }> {
  const sequence = works
    .filter((work) => work.hasEditorialPage)
    .sort((a, b) => (a.featuredOrder ?? a.order) - (b.featuredOrder ?? b.order));

  if (sequence.length < 2) return { previous: null, next: null };

  const index = sequence.findIndex((work) => work.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: sequence[(index - 1 + sequence.length) % sequence.length],
    next: sequence[(index + 1) % sequence.length],
  };
}
