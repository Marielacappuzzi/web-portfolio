import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  ArrowRightIcon,
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
    "Consultas sobre una obra disponible, un print o una exposición. Los encargos tienen su propio formulario de cotización.",
};

/**
 * /contacto — general enquiries, and nothing else.
 *
 * It used to open with "Cuéntame la historia que te gustaría convertir en una
 * obra" over six fields including phone, country and a "Retrato por encargo"
 * option — which made it a shorter version of the commission form under a
 * different title, competing with the page actually built for that.
 *
 * Four fields now, and a line pointing anyone who wants a quote at /encargos.
 * The difference between the two pages is stated rather than implied.
 *
 * The form is the primary channel and Instagram is the only external one:
 * no WhatsApp, no second network, no published address. The mailbox appears
 * in the privacy policy and the terms, where naming it is the point.
 */
export default async function ContactPage() {
  const [page, site] = await Promise.all([getContactPage(), getSite()]);

  return (
    <>
      <PageHeader heading={page.heading} />

      <Section ground="paper" rhythm="beat">
        <Container width="wide">
          <div className="grid gap-3xl lg:grid-cols-12 lg:gap-x-[5vw]">
            {/* The invitation, the other way in, and the door to /encargos. */}
            <div className="lg:col-span-4">
              <Reveal>
                <Prose paragraphs={page.paragraphs} />
              </Reveal>

              {/*
                The one place the two forms are told apart. Someone who came
                looking for a price and landed here should not have to work out
                that they are on the wrong page.
              */}
              <Reveal delay={60} className="mt-xl border-t border-rule pt-lg">
                <p className="max-w-[46ch] font-sans text-sm leading-relaxed text-pretty text-fg-muted">
                  {page.commissionNote.text}
                </p>
                <Link
                  href={page.commissionNote.action.href}
                  className="group mt-md inline-flex items-center gap-2xs border-b border-fg-muted py-2xs font-sans text-2xs font-medium uppercase tracking-label text-fg-strong transition-colors duration-300 hover:border-fg-strong"
                >
                  {page.commissionNote.action.label}
                  <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </Link>
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
                <EnquiryForm
                  form="consulta"
                  idPrefix="consulta"
                  fields={page.fields}
                  submitLabel={page.submitLabel}
                  confirmation={page.confirmation}
                  confirmationNote={page.confirmationNote}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
