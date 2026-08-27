import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/primitives/SmoothScroll";
import { PageTransition } from "@/components/primitives/PageTransition";
import { getSite } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  const site = await getSite();

  /*
    No navChildren. The dropdown that listed every work under Obras is gone
    with the restructure: the menu points at five sections of one page, and
    the three works that keep a page of their own are reached from the
    gallery rather than from a menu nobody opens on a phone.
  */

  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${instrumentSans.variable} antialiased`}
      suppressHydrationWarning
    >
      {/*
        No `h-full` on <html>, deliberately. `height: 100%` pins the root box
        to the viewport, and Lenis reads `scrollHeight` off this chain to know
        where scrolling ends — so it stopped short, a little before the footer,
        on every long page. The scrollbar still worked because it does not use
        that measurement. `min-h-dvh` keeps a short page filling the screen
        without capping a long one.
      */}
      <body data-ground="paper" className="flex min-h-dvh flex-col">
        <SmoothScroll />
        <PageTransition />

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-bg focus:px-4 focus:py-2 focus:font-sans focus:text-sm"
        >
          Saltar al contenido
        </a>

        <SiteHeader nav={site.nav} name={site.name} />

        <main id="contenido" className="flex-1">
          {children}
        </main>

        <SiteFooter site={site} />

        {/*
          Vercel observability. Runtime logs need nothing here — they are
          collected by the platform and read from the project dashboard.
          These two are the part that does require the page: Analytics
          reports which pages are visited, Speed Insights reports how fast
          they load for real visitors rather than in a lab.

          Neither sets a cookie or identifies anyone, so no consent banner is
          required — which matters on a site whose whole manner is quiet.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
