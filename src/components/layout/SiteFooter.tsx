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
 * only direct channel; everything else goes through the form on /encargos.
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
          {/*
            Centred while the footer is one column, left-aligned the moment it
            becomes two. Below `sm` the mark sat against the left edge with the
            line under it starting at the same edge but running short, which
            reads as misalignment rather than as a column. The images and the
            paragraph each need their own centring — a `text-center` does not
            move a block with a width cap — which is what `mx-auto` is doing on
            all three.
          */}
          <div className="mx-auto max-w-narrow text-center sm:mx-0 sm:text-left">
            {/*
              One mark, two files, chosen by width.

              They are the same lockup cropped differently. `logo-footer` is
              trimmed close — 160 x 92 of a 169 x 104 canvas — so at a 144px
              box the drawing itself measures 136 across. `lockup-claro` holds
              295 x 167 inside 500 x 315, barely half its height, and the same
              box draws it at 85: visibly smaller, which is what the correction
              was about.

              On a wide screen the small file has the detail it needs — 144 CSS
              pixels against 169 real ones at DPR 1 — and it keeps the mark at
              the size the footer was designed around. On a phone at DPR 3 that
              same box wants 432 real pixels and the small file was being
              stretched two and a half times, which is the softness that showed
              on a handset and not on a laptop; there the larger file wins.
              Its box is 230px rather than 144 to cancel the margin baked into
              it: the drawing then measures 135.7 against the small file's
              136.3, so the mark is the same size on both, and 230 CSS pixels
              of a 500px file is still sharp at DPR 3.

              Both carry the same #303030 field as the chamber ground, so
              either sits flush with no edge.
            */}
            <Image
              src="/marca/lockup-claro.png"
              alt={site.name}
              width={500}
              height={315}
              sizes="230px"
              className="mx-auto h-auto w-57.5 sm:mx-0 md:hidden"
            />
            <Image
              src="/marca/logo-footer.png"
              alt={site.name}
              width={169}
              height={104}
              sizes="144px"
              className="mx-auto hidden h-auto w-36 sm:mx-0 md:block"
            />
            <p className="mx-auto mt-sm max-w-[34ch] font-sans text-sm leading-relaxed text-fg-muted sm:mx-0">
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

              {/*
                No "Escribirme" here. It pointed at the quotation form on
                /encargos, which the navigation column two places away already
                reaches by name — so the footer offered the same destination
                twice under two different words. Instagram is the one channel
                this column is for.
              */}
            </ul>

            <p className="mt-md font-sans text-sm text-fg-muted">
              {site.location}
            </p>
          </div>
        </div>

        <Rule width="full" className="mt-3xl" />

        {/* Copyright left, legal right, on one line where both are expected. */}
        <div className="mt-md flex flex-col gap-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-fg-faint">{site.copyright}</p>

          <ul className="flex flex-wrap gap-x-lg gap-y-2xs">
            {site.legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-sans text-xs text-fg-faint transition-colors duration-300 hover:text-fg"
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
