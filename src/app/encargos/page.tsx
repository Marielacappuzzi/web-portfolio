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

      {/*
        The banner and the instruction, as one block.

        They were two stacked sections: a photograph, then a paragraph on
        paper underneath it. The picture was doing nothing for the text and
        the text was doing nothing for the picture. Now the photograph is the
        ground the instruction is written on — a hand, a charcoal and the
        drawing being made, behind the sentence that explains how to ask for
        one. It is the argument and the instruction in the same frame.

        The type sits left, which is where the photograph is darkest: that
        third measures R63 G52 B43, a relative luminance of 0.04, so white
        reaches about 12:1 on it before any veil at all. The wash is
        insurance for the crops, not a rescue, and it is gone by 60% — well
        clear of the hand and the tools on the right.

        On a phone the picture becomes the background of the whole block and
        the text starts 60svh down — below the horse's head and the hand, which
        are the whole point of the frame — carrying on into the section's own
        ground where it runs past the bottom edge. A gradient does the handover
        so there is no seam.
      */}
      {page.banner ? (
        <section
          aria-labelledby="cotizar-intro"
          data-ground="chamber"
          className="relative isolate overflow-hidden bg-bg text-fg"
        >
          <div className="absolute inset-x-0 top-0 h-[82svh] md:static md:h-auto">
            <picture>
              {/*
                The file swaps at the same breakpoint as the proportion, so the
                landscape frame is never fed the portrait crop. At 3.2:1 on a
                phone the horse would be an inch high, which is the opposite of
                the presence this block exists for.
              */}
              <source media="(min-width: 768px)" srcSet={page.banner.src} />
              <img
                src={page.banner.mobileSrc}
                alt={page.banner.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[45%_35%] md:aspect-[1920/600] md:h-auto md:object-center"
              />
            </picture>

            {/* Picture into ground, so the text crosses without a line. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 via-40% to-transparent md:hidden"
            />
          </div>

          {/* The wash for the wide layout: left to right, gone by 60%. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink/70 via-ink/35 via-32% to-transparent to-60% md:block"
          />

          <div className="relative pb-2xl pt-[60svh] md:absolute md:inset-0 md:flex md:items-center md:py-0 md:pt-0">
            <Container width="wide" className="w-full">
              <div className="md:grid md:grid-cols-12">
                <div className="md:col-span-6 lg:col-span-5">
                  <Reveal>
                    <h2 id="cotizar-intro" className="sr-only">
                      Cómo solicitar una cotización
                    </h2>
                    <p className="max-w-[46ch] font-sans text-base leading-relaxed text-pretty text-fg md:text-lg">
                      Elige el formato que tienes en mente, comparte brevemente
                      la idea detrás de la obra y envía las fotografías de
                      referencia disponibles. Con esa información, Mariela podrá
                      evaluar el proyecto y enviarte una cotización
                      personalizada.
                    </p>
                  </Reveal>

                  <Reveal delay={120} className="mt-xl">
                    <ActionButton href="#cotizar">
                      Cotizar un encargo
                    </ActionButton>
                  </Reveal>
                </div>
              </div>
            </Container>
          </div>
        </section>
      ) : null}

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

      {/*
        The practical detail, after the form.

        It sat before it for a while, on the reasoning that the questions it
        answers — what formats exist, how long it takes, what the deposit is —
        are the ones somebody needs settled before filling anything in. The
        client's call is the other way and it is the right one: a person who
        has already decided should not have to scroll past eight headings to
        reach the one thing they came to do. They are closed disclosures, so
        anyone who does want them can open them on the way past.
      */}
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
        /*
          The footer is chamber too, so without an edge the last question and
          the copyright sit on one uninterrupted field and the page looks like
          it stopped rather than ended.
        */
        className="border-b border-rule"
      />
    </>
  );
}
