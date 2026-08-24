import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/primitives/SmoothScroll";
import { getSite, getWorks } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

/**
 * Newsreader carries the editorial voice; Instrument Sans handles navigation,
 * technical sheets and forms. Neither appears on any of the reference sites —
 * all three use Cormorant Garamond. See docs/REFERENCE_AUDIT.md.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mariela Crapuzzi — Artista visual especializada en carboncillo",
    template: "%s — Mariela Crapuzzi",
  },
  description:
    "A través del realismo figurativo y el carboncillo, transformo recuerdos, vínculos y emociones en obras creadas para conservar aquello que una imagen, por sí sola, no alcanza a decir.",
  openGraph: {
    type: "website",
    locale: "es_BO",
    siteName: "Mariela Crapuzzi",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [site, works] = await Promise.all([getSite(), getWorks()]);

  /*
   * "Obra" drops the catalogue. The three pieces with an editorial page lead
   * the list and are marked as such; the rest anchor to their card in the
   * gallery, which is why WorkCard carries an id.
   *
   * Ordering by destination rather than by catalogue order puts the pages
   * worth visiting first, and keeps the two kinds of link from interleaving —
   * a list that alternates between "goes somewhere" and "scrolls down" is
   * harder to read than two groups.
   */
  const navChildren = {
    "/obra": [...works]
      .sort((a, b) => Number(b.hasEditorialPage) - Number(a.hasEditorialPage))
      .map((work) => ({
        label: work.title,
        href: work.hasEditorialPage
          ? `/obra/${work.slug}`
          : `/obra#${work.slug}`,
        editorial: work.hasEditorialPage,
      })),
  };

  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${instrumentSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body data-ground="paper" className="flex min-h-full flex-col">
        <SmoothScroll />

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-bg focus:px-4 focus:py-2 focus:font-sans focus:text-sm"
        >
          Saltar al contenido
        </a>

        <SiteHeader nav={site.nav} name={site.name} navChildren={navChildren} />

        <main id="contenido" className="flex-1">
          {children}
        </main>

        <SiteFooter site={site} />
      </body>
    </html>
  );
}
