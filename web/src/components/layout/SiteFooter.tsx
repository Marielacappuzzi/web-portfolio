import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "./Section";
import { Pending } from "@/components/primitives/Pending";
import { Rule } from "@/components/primitives/Rule";
import type { SiteContent } from "@/content/types";

/**
 * Footer. Copy is verbatim from docs/Copy.md — Footer section.
 *
 * Email and Instagram are unknown, so the contact column declares them as
 * pending rather than shipping an invented address. Filling them in
 * src/content/site.ts replaces the marker with a real link.
 */
export function SiteFooter({ site }: { site: SiteContent }) {
  const hasChannels = Boolean(site.email || site.instagramUrl);

  return (
    <Section as="footer" ground="chamber" rhythm="none" className="pt-3xl pb-xl">
      <Container width="wide">
        <div className="flex flex-col gap-3xl md:flex-row md:justify-between md:gap-xl">
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
              className="h-auto w-[13rem] sm:w-[15rem]"
            />
            <p className="mt-md font-sans text-sm text-fg-muted">{site.role}</p>
          </div>

          <div className="flex flex-col gap-2xl sm:flex-row sm:gap-4xl">
            <nav aria-label="Pie de página">
              <ul className="flex flex-col gap-xs">
                {site.footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-sm text-fg transition-colors duration-300 hover:text-fg-strong"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-xs">
              {site.instagramUrl && site.instagramHandle ? (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-sans text-sm text-fg transition-colors duration-300 hover:text-fg-strong"
                >
                  Instagram
                </a>
              ) : null}

              {site.email ? (
                <a
                  href={`mailto:${site.email}`}
                  className="font-sans text-sm text-fg transition-colors duration-300 hover:text-fg-strong"
                >
                  {site.email}
                </a>
              ) : null}

              {!hasChannels ? (
                <Pending kind="data" detail="Instagram y correo" />
              ) : null}

              <p className="font-sans text-sm text-fg-muted">{site.location}</p>
            </div>
          </div>
        </div>

        <Rule width="full" className="mt-3xl" />

        <div className="mt-md flex flex-col gap-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-fg-muted">{site.copyright}</p>

          <ul className="flex gap-md">
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
