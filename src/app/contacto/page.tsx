import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  InstagramIcon,
  LocationIcon,
} from "@/components/primitives/Icon";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow, Prose } from "@/components/primitives/Type";
import { getContactPage, getSite } from "@/lib/content";

/** One channel row: a line icon that lifts with the label on hover. */
const channelClass =
  "group inline-flex items-center gap-2xs font-sans text-sm text-fg " +
  "transition-colors duration-300 hover:text-fg-strong";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntame la historia que te gustaría convertir en una obra. Puede ser un recuerdo, una persona, un animal, un vínculo o una idea.",
};

/**
 * /contacto
 *
 * The form is the primary channel; email and Instagram are secondary and
 * WhatsApp is deliberately absent, as the brief asks. The page reads as the
 * beginning of a conversation rather than a request for a quote.
 */
export default async function ContactPage() {
  const [page, site] = await Promise.all([getContactPage(), getSite()]);

  return (
    <>
      <PageHeader heading={page.heading} />

      <Section ground="paper" rhythm="beat">
        <Container width="wide">
          <div className="grid gap-3xl lg:grid-cols-12 lg:gap-x-[5vw]">
            {/* The invitation and the other ways in. */}
            <div className="lg:col-span-4">
              <Reveal>
                <Prose paragraphs={page.paragraphs} />
              </Reveal>

              <div className="mt-3xl">
                <Reveal delay={90}>
                  <Eyebrow as="h2">{page.channelsLabel}</Eyebrow>
                </Reveal>

                <ul className="mt-md flex flex-col gap-sm">
                  {site.instagramUrl && site.instagramHandle ? (
                    <li>
                      <a
                        href={site.instagramUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={channelClass}
                      >
                        <InstagramIcon className="shrink-0 text-fg-faint transition-colors duration-300 group-hover:text-fg-strong" />
                        {site.instagramHandle}
                      </a>
                    </li>
                  ) : null}

                  {/*
                    The address is a place to send a print to, not a shop to
                    visit, so it opens a map rather than sitting inert.
                  */}
                  <li>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location)}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={channelClass}
                    >
                      <LocationIcon className="shrink-0 text-fg-faint transition-colors duration-300 group-hover:text-fg-strong" />
                      {site.location}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* The form. */}
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={120}>
                <ContactForm page={page} />
              </Reveal>

              <Reveal delay={180} className="mt-2xl">
                <p className="max-w-[52ch] font-sans text-sm leading-relaxed text-fg-muted">
                  {page.confirmation}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
