import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pending } from "@/components/primitives/Pending";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow, Prose } from "@/components/primitives/Type";
import { getContactPage, getSite } from "@/lib/content";

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
  const hasChannels = Boolean(site.email || site.instagramUrl);

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

                <div className="mt-md flex flex-col gap-2xs">
                  {site.instagramUrl && site.instagramHandle ? (
                    <a
                      href={site.instagramUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-sans text-sm text-fg transition-colors duration-300 hover:text-fg-strong"
                    >
                      {site.instagramHandle}
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

                  <p className="mt-2xs font-sans text-sm text-fg-muted">
                    {site.location}
                  </p>
                </div>
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
