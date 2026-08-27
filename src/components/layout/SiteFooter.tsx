import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "./Section";
import { InstagramIcon } from "@/components/primitives/Icon";
import { Rule } from "@/components/primitives/Rule";
import type { SiteContent } from "@/content/types";

/**
 * Footer. Copy is verbatim from docs/Copy.md — Footer section.
 *
 * Four columns on desktop, stacked on a phone: the mark and what she does,
 * then the two navigations, then the channels. Labelled column headings give
 * the block a spine — without them a footer is a pile of links at one weight,
 * which is what makes most of them read as an afterthought.
 *
 * Channels carry line icons at the same 1px weight as every rule on the site,
 * so they read as drawn marks rather than UI.
 *
 * No email address here, confirmed by the client: publishing one hands it to
 * scrapers, and the form already delivers to Mariela's inbox. Instagram is the
 * only direct channel; everything else goes through /contacto.
 */

/** Column heading. Quieter than an Eyebrow — this is furniture, not voice. */
function ColumnLabel({ children }: { children: string }) {
  return (
    <h2 className="font-sans text-2xs font-medium uppercase tracking-label text-fg-faint">
      {children}
    </h2>
  );
}

const linkClass =
  "inline-flex items-center gap-2xs font-sans text-sm text-fg " +
  "transition-colors duration-300 hover:text-fg-strong";

export function SiteFooter({ site }: { site: SiteContent }) {

  return (
    <Section
      as="footer"
      style={{ viewTransitionName: "site-footer" }} ground="chamber" rhythm="none" className="pt-3xl pb-lg">
      <Container width="wide">
        {/*
          Three columns: who she is, where to go, how to reach her. Legal used
          to hold a column of its own, which gave two links the same weight as
          the whole navigation. They belong in the bottom row beside the
          copyright, which is where a reader looks for them.
        */}
        <div className="grid grid-cols-1 gap-2xl sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-xl">
          <div className="max-w-narrow">
            {/*
              The lockup at its native 169px. Rendered any larger it softens —
              the file has no more detail to give. Its background is the same
              #303030 as the chamber ground, so it sits flush with no edge.
            */}
            <Image
              src="/marca/logo-footer.png"
              alt={site.name}
              width={169}
              height={104}
              className="h-auto w-[9rem]"
            />
            <p className="mt-sm max-w-[34ch] font-sans text-sm leading-relaxed text-fg-muted">
              {site.role}
            </p>
          </div>

          <nav aria-labelledby="footer-nav-titulo">
            <ColumnLabel>Navegación</ColumnLabel>
            <ul id="footer-nav-titulo" className="mt-md flex flex-col gap-xs">
              {site.footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnLabel>Contacto</ColumnLabel>

            <ul className="mt-md flex flex-col gap-xs">
              {site.instagramUrl && site.instagramHandle ? (
                <li>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={linkClass}
                  >
                    <InstagramIcon />
                    {site.instagramHandle}
                  </a>
                </li>
              ) : null}

              <li>
                <Link href="/contacto" className={linkClass}>
                  Escribirme
                </Link>
              </li>
            </ul>

            <p className="mt-md font-sans text-sm text-fg-muted">
              {site.location}
            </p>
          </div>
        </div>

        <Rule width="full" className="mt-3xl" />

        {/* Copyright left, legal right, on one line where both are expected. */}
        <div className="mt-md flex flex-col gap-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-fg-muted">{site.copyright}</p>

          <ul className="flex flex-wrap gap-x-lg gap-y-2xs">
            {site.legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-sans text-xs text-fg-muted transition-colors duration-300 hover:text-fg-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
