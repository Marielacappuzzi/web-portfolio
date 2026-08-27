/**
 * Content model.
 *
 * Everything the site renders is described here. Components never hold copy or
 * artwork data — they receive it as props. When the admin panel arrives, these
 * types become the Supabase row shapes and only `src/lib/content.ts` changes.
 *
 * Optional fields are genuinely optional: the UI renders what exists and omits
 * what does not. Nothing is invented to fill a gap.
 */

/** What kind of piece it is. Shown as discreet metadata in the gallery. */
export type WorkKind = "personal" | "commission" | "print";

/** Availability. Shown only when set. */
export type WorkStatus = "available" | "private-collection" | "sold-out";

/** Aspect ratio of the photographed piece, so no crop decides for Mariela. */
export type Ratio = "portrait" | "landscape" | "square";

export interface WorkImage {
  /** Path under /public, e.g. "/obra/la-leona-con-su-instinto/principal.jpg" */
  src: string;
  /** Real description of what is shown. Never the title alone. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/**
 * A piece of process footage, served from /public.
 *
 * Local files, not an embed: the player is ours, so there is no third-party
 * chrome over the work, no cookies and no request to Google. The originals ran
 * to 180 MB between them and were re-encoded to under 10 MB, which is what
 * made keeping them in the repository possible at all.
 */
export interface VideoSource {
  src: string;
  poster?: string;
  label: string;
  /** True for 9:16 clips, framed portrait rather than cropped. */
  portrait?: boolean;
  caption?: string;
}

export interface Work {
  slug: string;
  title: string;
  /** Sits on the year line, e.g. "after William-Adolphe Bouguereau". */
  attribution?: string;

  /**
   * Technical sheet, per Fichas_tecnicas_obras_..._v4.pdf. It is rendered with
   * no field labels — title, then year, then technique, dimensions and status
   * in a quieter hierarchy. Dimensions are always cm, alto × ancho.
   */
  year?: number;
  technique?: string;
  support?: string;
  dimensions?: string;

  kind?: WorkKind;
  status?: WorkStatus;
  /** The small closing line: "Obra original.", "Retrato de mascota."… */
  note?: string;

  /** Null while the photograph does not exist. ArtworkFrame handles it. */
  image: WorkImage | null;
  /** Fallback only. When `image` exists its intrinsic ratio wins. */
  ratio?: Ratio;
  /**
   * Where the crop holds on the editorial cover, e.g. "50% 30%". Every work
   * is a portrait photograph in a landscape band, so something is always cut;
   * this decides what survives. Default keeps the upper third, which is where
   * the gaze sits in most of them — and the gaze is the point.
   */
  coverFocus?: string;
  detailImages?: WorkImage[];
  processImages?: WorkImage[];
  /**
   * The piece framed and hung in a room. These sell scale and presence, which
   * a photograph of the sheet alone cannot: a visitor asking what a 100 x 70
   * charcoal looks like on a wall is answered here, not in the technical
   * sheet. Kept separate from `detailImages` because they show a setting, not
   * the work.
   */
  framedImages?: WorkImage[];
  /** Shown in "El proceso" on the editorial page. */
  processVideos?: VideoSource[];

  /** One or two sentences. Used in the gallery and the editorial page opening. */
  shortStory?: string;
  /** The editorial page body. Each string is a paragraph. */
  longStory?: string[];

  /** Concept label for the three narrative pieces, e.g. "EL ORIGEN". */
  concept?: string;
  /** Copy for the link that opens the editorial page. */
  featuredLinkLabel?: string;

  featured: boolean;
  hasEditorialPage: boolean;
  printAvailable: boolean;
  /** Shown on the editorial page when an edition is available. */
  printEdition?: PrintEdition;

  /** Position in the gallery. */
  order: number;
  /** Position in the home's narrative sequence, when featured. */
  featuredOrder?: number;
}

/**
 * A print edition, kept structurally separate from the original.
 *
 * The technical sheet is explicit: the gallery shows one thumbnail, and the
 * work page presents the original first and the edition below it, in a clearly
 * separated block — so it reads as two states of one piece, not two works.
 */
export interface PrintEdition {
  eyebrow: string;
  title: string;
  /** The edition framed, which is how it ships within Santa Cruz. */
  image?: WorkImage;
  /** Kind, paper, dimensions, edition size, signature — one line each. */
  specs: string[];
  availability: string;
  details: { label: string; body: string };
  delivery: { label: string; lines: string[] };
  action: NavItem;
}

/* ---------------------------------------------------------------- site --- */

/**
 * A work listed under a nav item.
 *
 * Two kinds of destination sit in the same list, and they behave differently
 * once clicked: a piece with its own editorial page leads somewhere new, the
 * rest scroll to a card in the gallery. The menu marks the difference rather
 * than making the reader discover it.
 */
export interface NavChild {
  label: string;
  href: string;
  /** True when the link opens a page of its own rather than an anchor. */
  editorial?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

/**
 * An address whose real mailbox and printed form differ.
 *
 * The account was created with a misspelling of the surname. `address` is the
 * mailbox that actually receives — every mailto and every action uses it —
 * while `display` is the corrected spelling the reader sees.
 *
 * This is a deliberate trade the client asked for, and it has a real cost:
 * anyone who retypes what they read instead of clicking will reach nothing.
 * Registering the corrected address and forwarding it would remove the trap.
 */
export interface LegalEmail {
  /** The mailbox that receives. Never shown. */
  address: string;
  /** What the reader sees. Never used to send. */
  display: string;
}

export interface SiteContent {
  name: string;
  role: string;
  location: string;
  /**
   * The address shown as a contact channel in the footer and on /contacto.
   * Null by decision — publishing one there feeds scrapers.
   */
  email: string | null;
  /**
   * The address a legal document has to name, so someone can ask for their
   * data. Kept separate from `email` precisely because it appears only there.
   */
  legalEmail: LegalEmail | null;
  instagramHandle: string | null;
  instagramUrl: string | null;
  nav: NavItem[];
  legalNav: NavItem[];
  footerNav: NavItem[];
  copyright: string;
}

/* --------------------------------------------------- shared copy blocks --- */

/**
 * Eyebrow + display heading. The unit every page section opens with.
 *
 * The eyebrow is optional: some sections read better with the headline
 * carrying the whole weight, and that is a content decision rather than a
 * component one. Omit it and nothing renders in its place.
 */
export interface SectionHeading {
  eyebrow?: string;
  title: string;
}

export interface ProseBlock extends SectionHeading {
  paragraphs: string[];
  pullQuote?: string;
  action?: NavItem;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessBlock extends SectionHeading {
  intro: string;
  steps: ProcessStep[];
}

/* ------------------------------------------------------------------ home --- */

/** The full-bleed portada behind the hero. */
export interface CoverContent {
  /** Landscape file, used from the `sm` breakpoint up. */
  src: string;
  alt: string;
  /**
   * Portrait file for phones. Optional: without it the landscape image is
   * recropped, which works but wastes most of a 2.56:1 frame on a narrow
   * screen. A separate file is composed for that shape rather than cut down
   * to it, so the subject keeps its placement instead of drifting out of the
   * crop.
   */
  mobileSrc?: string;
  /** `object-position` holding the crop as the frame narrows, e.g. "50% 30%". */
  focus?: string;
}

export interface HeroContent {
  /**
   * Optional. The hero leads with her name now, so a label above it would be
   * a second voice before the first has spoken.
   */
  eyebrow?: string | null;
  title: string;
  /** Sits under the name: what she does, in one line. */
  subtitle?: string;
  description: string;
  primaryAction: NavItem;
  secondaryAction: NavItem;
  /**
   * The cover band behind the opening sentence. 1920 x 750 at desktop,
   * recropped by the browser for narrower frames — see CoverImage. Null
   * until the portada has been produced.
   */
  cover: CoverContent | null;
}

/**
 * The home carries the shortest possible version of the statement: the
 * headline and the sentence to carry away. The reasoning behind it lives on
 * /sobre-mi. See docs/PROJECT_CONTEXT.md §8.
 */
export interface HomeStatementContent {
  eyebrow?: string;
  titleLines: string[];
  pullQuote: string;
}

export interface HomeWorkContent extends SectionHeading {
  action: NavItem;
}

export interface HomeContactContent extends SectionHeading {
  paragraph: string;
  primaryAction: NavItem;
  /**
   * Optional. A closing block that already has the reader convinced needs one
   * button; a second one beside it is usually an exit dressed as a choice.
   */
  secondaryAction?: NavItem;
}

/**
 * The artist, on the home.
 *
 * Sits before the work so a visitor meets the person behind the gaze before
 * exploring the pieces. Deliberately short — it introduces Mariela; /sobre-mi
 * is where she is actually explained.
 */
export interface HomeArtistContent extends SectionHeading {
  paragraphs: string[];
  action: NavItem;
  image: { src: string; alt: string };
}

export interface HomeFeaturedContent {
  eyebrow: string;
}

export interface HomeContent {
  hero: HeroContent;
  statement: HomeStatementContent;
  artist: HomeArtistContent;
  work: HomeWorkContent;
  featured: HomeFeaturedContent;
  contact: HomeContactContent;
}

/* --------------------------------------------------------------- /obra --- */

export interface WorkIndexPage extends SectionHeading {
  description: string;
  /** Shown when the catalogue is still empty. */
  emptyMessage: string;
}

/* ----------------------------------------------------------- /sobre-mi --- */

export interface AboutPage {
  heading: SectionHeading;
  intro: string[];
  statement: {
    eyebrow?: string;
    titleLines: string[];
    paragraphs: string[];
    pullQuote: string;
  };
  language: ProseBlock;
  /** Shown beside the charcoal section — the material, not an illustration. */
  languageVideo?: VideoSource;
  vision: SectionHeading & { intro: string; ideas: AboutIdea[] };
}

/**
 * How Mariela looks at a subject, told as ideas rather than steps.
 *
 * The five operational stages (escuchar, encontrar la imagen, interpretar,
 * crear, proteger y entregar) belong to /encargos and appear only there. Here
 * the same practice is described from the inside: what she looks for, what she
 * keeps, what realism is for. Repeating the numbered list on both pages made
 * the two read as the same page twice.
 */
export interface AboutIdea {
  title: string;
  body: string;
}

/* ----------------------------------------------------------- /encargos --- */

export interface CommissionsPage {
  heading: SectionHeading;
  paragraphs: string[];
  kinds: { label: string; items: string[] };
  process: ProcessBlock;
  /** Formats, timings, deposit, shipping — the practical detail. */
  practical: {
    eyebrow: string;
    title: string;
    sections: DetailSection[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  closing: HomeContactContent;
}

/** A titled block of prose. Bullets only where a list is genuinely a list. */
export interface DetailSection {
  title: string;
  body: string[];
  bullets?: string[];
}

/**
 * One question and its answer.
 *
 * The FAQ exists to extend "Detalles del encargo", never to restate it. A
 * question already answered in full a screen above earns nothing by being
 * asked again.
 */
export interface FaqItem {
  question: string;
  answer: string[];
}

/* ----------------------------------------------------------- /contacto --- */

export type FieldKind = "text" | "email" | "tel" | "select" | "textarea";

export interface FormField {
  name: string;
  label: string;
  hint?: string;
  kind: FieldKind;
  required: boolean;
  options?: string[];
}

export interface ContactPage {
  heading: SectionHeading;
  paragraphs: string[];
  fields: FormField[];
  submitLabel: string;
  confirmation: string;
  /** One line under the thank-you: what happens next, and when. */
  confirmationNote: string;
  channelsLabel: string;
}

/* -------------------------------------------------------------- legal --- */

export interface LegalPage {
  heading: SectionHeading;
  /** Shown under the title, e.g. "Última actualización: 2026". */
  updated: string;
  intro: string[];
  sections: DetailSection[];
  /**
   * True where the section needs the contact address that does not exist yet.
   * The page renders a declared marker there instead of an invented mailbox.
   */
  contactSectionIndexes?: number[];
}
