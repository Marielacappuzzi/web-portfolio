import { home } from "@/content/home";
import { about } from "@/content/pages/about";
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

export async function getPrivacyPage(): Promise<LegalPage> {
  return privacy;
}

export async function getTermsPage(): Promise<LegalPage> {
  return terms;
}

/* ---------------------------------------------------------------- works --- */

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

/*
 * getCommissionedWorks and getCommissionVideos are gone with the two blocks
 * they fed — "Encargos realizados" and "Obras en proceso" on /encargos. Both
 * showed pieces that were already in the gallery, each labelled as a
 * commission, so the page was a second gallery with the same photographs in
 * it. Restoring either is a filter over `works`, not a lost capability.
 */

/** Everything that is not one of the three flagships. */
export async function getRestOfCatalogue(): Promise<Work[]> {
  return works.filter((work) => !work.featured).sort(byOrder);
}

/** Works that get their own editorial page — drives generateStaticParams. */
export async function getEditorialWorks(): Promise<Work[]> {
  return works.filter((work) => work.hasEditorialPage).sort(byOrder);
}

/**
 * The piece that follows this one in the narrative sequence, wrapping at the
 * end so an editorial page always offers somewhere to go next.
 */
export async function getNextWork(slug: string): Promise<Work | null> {
  const editorial = await getEditorialWorks();
  if (editorial.length < 2) return null;

  const index = editorial.findIndex((work) => work.slug === slug);
  if (index === -1) return null;

  return editorial[(index + 1) % editorial.length];
}
