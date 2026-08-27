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

/*
 * ProcessStep and ProcessBlock are gone with the five stages they described —
 * escuchar, encontrar la imagen, interpretar, crear, proteger y entregar. They
 * were told twice, as how Mariela works on /sobre-mi and as what to expect on
 * /encargos, and both tellings were removed in the same pass: the commissions
 * page needed to reach its form sooner, and the artist page was explaining a
 * workflow where it should have been describing a practice.
 */

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
  /*
    No name and no specialty here: both live in site.ts, which is the one place
    that says who she is. The hero reads them rather than repeating them.
  */
  /** What she does, in one sentence. The third line of the first screen. */
  description: string;
  primaryAction: NavItem;
  secondaryAction: NavItem;
  /**
   * The cover band. Two files — a landscape frame and a portrait crop for
   * phones — see CoverImage. Null until the portada has been produced.
   */
  cover: CoverContent | null;
}

/**
 * The three flagship pieces on the home.
 *
 * One editorial line above them and nothing else. The section that used to
 * precede this one — a two-line manifesto and a pull quote — said the same
 * thing as the artist block below it and the gallery intro after that, in
 * three different arrangements of the same six words. The work makes the
 * argument better than another heading about looking.
 */
export interface HomeFeaturedContent {
  eyebrow: string;
  /** The one poetic line the home keeps, set over the work it describes. */
  line?: string;
  /** The way through to the full catalogue. */
  action: NavItem;
}

/**
 * The artist, on the home.
 *
 * Deliberately short — it introduces Mariela and hands off to /sobre-mi, which
 * is where she is actually explained.
 */
export interface HomeArtistContent extends SectionHeading {
  paragraphs: string[];
  action: NavItem;
  image: { src: string; alt: string };
}

/**
 * Commissions, on the home.
 *
 * What can be asked for and how to ask. No process, no stages, no examples —
 * the pieces are in the gallery and each one already says whether it was a
 * commission.
 */
export interface HomeCommissionsContent extends SectionHeading {
  paragraph: string;
  /** What a commission can be. Four or five words each, never sentences. */
  kinds: string[];
  action: NavItem;
}

export interface HomeContactContent extends SectionHeading {
  paragraph: string;
  primaryAction: NavItem;
  secondaryAction?: NavItem;
}

/**
 * The home, as the whole tour:
 *
 *   hero -> obras -> sobre Mariela -> encargos -> contacto
 *
 * Someone who reads only this page should be able to leave knowing who she
 * is, what she makes, and how to ask for a piece.
 */
export interface HomeContent {
  hero: HeroContent;
  featured: HomeFeaturedContent;
  artist: HomeArtistContent;
  commissions: HomeCommissionsContent;
  contact: HomeContactContent;
}

/* --------------------------------------------------------------- /obra --- */

export interface WorkIndexPage extends SectionHeading {
  description: string;
  /** Heading over the three flagships, grouped above the catalogue. */
  featuredEyebrow: string;
  /** Heading over everything else. */
  restEyebrow: string;
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
}

/* ----------------------------------------------------------- /encargos --- */

/**
 * /encargos — five blocks, in the order someone actually needs them.
 *
 *   1. what can be commissioned      intro
 *   2. what to send                  brief
 *   3. the form                      quote
 *   4. the detail, for who wants it  practical
 *   5. what the detail leaves open   faq
 *
 * The five-stage process (escuchar, encontrar la imagen, interpretar, crear,
 * proteger y entregar) and the row of finished commissions are both gone.
 * Nobody needs to follow how Mariela reasons before asking what a piece costs,
 * and the works were already in the gallery, each one labelled as a commission
 * — the page was a second gallery with the same pictures in it.
 */
export interface CommissionsPage {
  heading: SectionHeading;
  /** Two lines: what a commission can be. Not a manifesto. */
  intro: { paragraph: string; action: NavItem };
  /** What to prepare before writing. One paragraph, then the form. */
  brief: { title: string; paragraph: string };
  quote: QuoteForm;
  /** Formats, timings, deposit, shipping. After the form, never before it. */
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
}

/**
 * The quote form — the page's real content.
 *
 * Shares its shape with the contact form, and its endpoint. `kind` rides along
 * in the payload so the email that lands in Mariela's inbox says which of the
 * two she is reading, and so a quote request never looks like a general
 * enquiry.
 */
export interface QuoteForm {
  kind: string;
  title: string;
  paragraph: string;
  fields: FormField[];
  submitLabel: string;
  confirmation: string;
  confirmationNote: string;
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

/**
 * /contacto — general enquiries only.
 *
 * Four fields. Anyone who wants to commission a piece has a form of their own
 * on /encargos with formats, a brief and a type of commission; this one is for
 * the person asking about an available work, a print, an exhibition, or
 * anything that is not a quote. Two near-identical forms under two titles was
 * the thing to fix.
 */
export interface ContactPage {
  heading: SectionHeading;
  paragraphs: string[];
  fields: FormField[];
  submitLabel: string;
  confirmation: string;
  /** One line under the thank-you: what happens next, and when. */
  confirmationNote: string;
  channelsLabel: string;
  /** Points anyone who actually wants a quote at the right form. */
  commissionNote: { text: string; action: NavItem };
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
