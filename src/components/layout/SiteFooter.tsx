import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "./Section";
import { InstagramIcon, MailIcon } from "@/components/primitives/Icon";
import { Pending } from "@/components/primitives/Pending";
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
 * so they read as drawn marks rather than UI. Email is still unknown, so its
 * row declares itself pending rather than shipping an invented address;
 * filling `email` in src/content/site.ts turns it into a real link.
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
  const hasChannels = Boolean(site.email || site.instagramUrl);

  return (
    <Section as="footer" ground="chamber" rhythm="none" className="pt-3xl pb-lg">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-2xl sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-xl">
          <div className="max-w-narrow">
            {/*
              The full lockup, at the size it was drawn for. Its background is
              the same #303030 as the chamber ground, so it sits flush with no
              visible edge — which is why the ground colour was matched to the
              logo rather than the other way round.
            */}
            <Image
              src="/marca/lockup-claro.png"
              alt={site.name}
              width={500}
              height={315}
              className="h-auto w-[12rem] sm:w-[13rem]"
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

          <nav aria-labelledby="footer-legal-titulo">
            <ColumnLabel>Legal</ColumnLabel>
            <ul id="footer-legal-titulo" className="mt-md flex flex-col gap-xs">
              {site.legalNav.map((item) => (
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

              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    <MailIcon />
                    {site.email}
                  </a>
                </li>
              ) : (
                <li className="flex items-center gap-2xs text-fg-faint">
                  <MailIcon />
                  <Pending kind="data" detail="Correo" />
                </li>
              )}

              {!hasChannels ? (
                <li>
                  <Pending kind="data" detail="Instagram y correo" />
                </li>
              ) : null}
            </ul>

            <p className="mt-md font-sans text-sm text-fg-muted">
              {site.location}
            </p>
          </div>
        </div>

        <Rule width="full" className="mt-3xl" />

        <p className="mt-md font-sans text-xs text-fg-faint">
          {site.copyright}
        </p>
      </Container>
    </Section>
  );
}
