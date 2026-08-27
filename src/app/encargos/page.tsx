import type { Metadata } from "next";
import { DetailSections } from "@/components/blocks/DetailSections";
import { Faq } from "@/components/blocks/Faq";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import { getCommissionsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Encargos",
  description:
    "Retratos de personas, mascotas, homenajes y composiciones en carboncillo, creados por encargo. Solicita una cotización.",
};

/**
 * /encargos — four blocks, in the order somebody needs them.
 *
 *   1. what can be commissioned
 *   2. what to send            + the form, immediately
 *   3. the practical detail    for whoever wants it
 *   4. the two questions       the detail leaves open
 *
 * Removed in this pass, and worth recording because each was deliberate once:
 *
 *  · The five stages — escuchar, encontrar la imagen, interpretar, crear,
 *    proteger y entregar. A person deciding whether to ask for a price does not
 *    first need to follow how Mariela reasons through each decision. They were
 *    the tallest block on the page and sat between the reader and the form.
 *  · "Encargos realizados", four finished pieces. All four are in the gallery,
 *    each labelled as a commission — this page was a second gallery holding the
 *    same photographs.
 *  · "Obras en proceso", two videos, for the same reason.
 *  · The closing invitation, which repeated the form directly above it.
 *
 * The page went from eight sections to four, and the form moved from seventh
 * to second.
 */
export default async function CommissionsPage() {
  const page = await getCommissionsPage();

  return (
    <>
      <PageHeader
        heading={page.heading}
        image={{
          /*
           * A real photograph, not a staged interior: the artist beside a
           * finished piece. It carries the scale of the work and the fact that
           * a person made it — the two things this page has to establish
           * before anything else.
           */
          src: "/estudio/mariela-con-obra.jpg",
          alt: "Mariela Crapuzzi de pie junto al retrato terminado de Molly, montado sobre un caballete en su estudio.",
          aspect: "aspect-[4/5]",
          caption: "Junto a «Molly», una vez terminada.",
        }}
      />

      {/* 1 — What can be asked for, and the way to ask. Two lines. */}
      <Section ground="paper" rhythm="beat" aria-labelledby="intro-encargos">
        <Container width="wide">
          <div className="max-w-[60ch]">
            <Reveal>
              <h2 id="intro-encargos" className="sr-only">
                Qué puede encargarse
              </h2>
              <p className="font-serif text-xl font-light leading-snug text-pretty text-fg-strong">
                {page.intro.paragraph}
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-xl">
              <ActionButton href={page.intro.action.href}>
                {page.intro.action.label}
              </ActionButton>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/*
        2 — The brief and the form, in one block.

        The instruction and the fields it describes belong to each other: split
        across two sections, the reader finishes the instruction, scrolls, and
        has to remember it. Here the paragraph sits directly above the form it
        is about.
      */}
      <Section
        ground="paper-bright"
        rhythm="act"
        id="cotizar"
        aria-labelledby="cotizar-titulo"
      >
        <Container width="wide">
          <div className="grid gap-3xl lg:grid-cols-12 lg:gap-x-[5vw]">
            <div className="lg:col-span-4">
              <Reveal>
                <Display id="cotizar-titulo" measure={20}>
                  {page.quote.title}
                </Display>
              </Reveal>

              <Reveal delay={120} className="mt-xl">
                <p className="max-w-[52ch] font-sans text-base leading-relaxed text-pretty text-fg">
                  {page.quote.paragraph}
                </p>
              </Reveal>

              {/* What to have ready, beside the fields that ask for it. */}
              <Reveal delay={200} className="mt-2xl border-t border-rule pt-lg">
                <h3 className="font-sans text-2xs font-medium uppercase tracking-label text-fg-muted">
                  {page.brief.title}
                </h3>
                <p className="mt-md max-w-[52ch] font-sans text-sm leading-relaxed text-pretty text-fg">
                  {page.brief.paragraph}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={150}>
                <EnquiryForm
                  form="cotizacion"
                  idPrefix="encargo"
                  fields={page.quote.fields}
                  submitLabel={page.quote.submitLabel}
                  confirmation={page.quote.confirmation}
                  confirmationNote={page.quote.confirmationNote}
                />
              </Reveal>

              {/*
                PENDING — reference photographs.
                The brief asks for uploads "si técnicamente ya existe soporte
                adecuado para archivos". There is none: no storage bucket, no
                signed-upload route, no virus scanning and no size limit. A
                file input wired to something improvised would be worse than
                none at all, so the form asks for the references in words and
                Mariela requests them in her reply. Wiring it properly needs the
                Supabase storage decision that is already on the roadmap.
              */}
              <Reveal delay={220} className="mt-lg">
                <p className="max-w-[52ch] font-sans text-sm leading-relaxed text-fg-muted">
                  Las fotografías de referencia se solicitan por correo al
                  responder tu consulta, para que puedas enviarlas en su
                  calidad original.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 — Everything practical, after the form and never before it. */}
      <DetailSections
        eyebrow={page.practical.eyebrow}
        title={page.practical.title}
        sections={page.practical.sections}
        headingId="practico-titulo"
      />

      {/* 4 — Only what the block above genuinely leaves open. */}
      <Faq
        eyebrow={page.faq.eyebrow}
        title={page.faq.title}
        items={page.faq.items}
        ground="paper-bright"
        id="preguntas"
        headingId="faq-titulo"
      />
    </>
  );
}
