import type { Metadata } from "next";
import { DetailSections } from "@/components/blocks/DetailSections";
import { Faq } from "@/components/blocks/Faq";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Display } from "@/components/primitives/Type";
import { getCommissionsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Encargos",
  description:
    "Retratos de personas, mascotas, homenajes y composiciones creadas a partir de una historia, una imagen o un vínculo.",
};

/**
 * /encargos — a page that exists to produce a quotation request.
 *
 * It used to open with five stages of creative process and a second gallery of
 * finished commissions before anyone could ask for anything. Both are gone at
 * the client's instruction: someone who arrives here has already decided, and
 * making them read how Mariela thinks before they can write is a page serving
 * itself.
 *
 * The order is now: what can be asked for, what to send, the form, and then —
 * for whoever wants it — the detail and the questions.
 */
export default async function CommissionsPage() {
  const page = await getCommissionsPage();

  return (
    <>
      <PageHeader
        heading={{
          title: "Una obra creada a partir de aquello que quieres conservar.",
        }}
        lead="Retratos de personas, mascotas, homenajes y composiciones creadas a partir de una historia, una imagen o un vínculo."
      />

      {/* What to send, in one paragraph, and the way down to the form. */}
      <Section ground="paper" rhythm="beat">
        <Container width="wide">
          <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <p className="max-w-[62ch] font-sans text-lg leading-relaxed text-pretty text-fg">
                  Elige el formato que tienes en mente, comparte brevemente la
                  idea detrás de la obra y envía las fotografías de referencia
                  disponibles. Con esa información, Mariela podrá evaluar el
                  proyecto y enviarte una cotización personalizada.
                </p>
              </Reveal>

              <Reveal delay={120} className="mt-xl">
                <ActionButton href="#cotizar">Cotizar un encargo</ActionButton>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* The form. The point of the page. */}
      <Section
        id="cotizar"
        ground="paper-bright"
        rhythm="act"
        aria-labelledby="cotizar-titulo"
      >
        <Container width="wide">
          <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
            <div className="lg:col-span-4">
              <Reveal>
                <Display id="cotizar-titulo" measure={18}>
                  {page.quote.heading.title}
                </Display>
              </Reveal>

              <Reveal delay={90} className="mt-lg">
                <p className="max-w-[46ch] font-sans text-base leading-relaxed text-pretty text-fg">
                  {page.quote.paragraphs[0]}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm page={page.quote} />
            </div>
          </div>
        </Container>
      </Section>

      {/* For whoever wants to read further. */}
      <DetailSections
        eyebrow={page.practical.eyebrow}
        title={page.practical.title}
        sections={page.practical.sections}
        headingId="practico-titulo"
      />

      <Faq
        eyebrow={page.faq.eyebrow}
        title={page.faq.title}
        items={page.faq.items}
        ground="chamber"
        headingId="faq-titulo"
      />
    </>
  );
}
