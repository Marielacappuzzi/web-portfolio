import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getSite } from "@/lib/content";
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

/**
 * Absolute base for canonical and Open Graph URLs.
 *
 * Vercel injects VERCEL_PROJECT_PRODUCTION_URL on every deployment, so the
 * site is correct from the first push even before a custom domain is pointed
 * at it. Set NEXT_PUBLIC_SITE_URL once the real domain exists — it wins.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

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

  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${instrumentSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body data-ground="paper" className="flex min-h-full flex-col">
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
      </body>
    </html>
  );
}
