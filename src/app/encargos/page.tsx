import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { PendingTopics } from "@/components/blocks/PendingTopics";
import { ProcessList } from "@/components/blocks/ProcessList";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { SilentVideo } from "@/components/primitives/SilentVideo";
import { Eyebrow, Prose } from "@/components/primitives/Type";
import { ArtworkFrame } from "@/components/work/ArtworkFrame";
import { WorkMeta } from "@/components/work/WorkMeta";
import {
  getCommissionVideos,
  getCommissionedWorks,
  getCommissionsPage,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Encargos",
  description:
    "Un retrato no comienza con una fotografía. Comienza con una conversación.",
};

/**
 * /encargos
 *
 * Presented as an experience, not a service listing: the conversation, the
 * five stages, then the practical detail. No pricing, no urgency, no repeated
 * buttons — the page ends with the same single invitation the home does.
 *
 * PENDING: the practical block has no approved copy. It ships as a declared
 * outline rather than invented figures. See docs/CONTENT_PENDING.md #16.
 */
export default async function CommissionsPage() {
  const [page, commissioned, filmed] = await Promise.all([
    getCommissionsPage(),
    getCommissionedWorks(4),
    getCommissionVideos(),
  ]);

  return (
    <>
      <PageHeader
        heading={page.heading}
        image={{
          src: "/obra/sueno-de-primavera/extra-02.jpg",
          alt: "Una obra de Mariela Crapuzzi enmarcada en negro con paspartú blanco, colgada en el salón de una casa.",
          aspect: "aspect-square",
          caption: "Una obra terminada, en su destino.",
        }}
      />

      {/* What a commission is. */}
      <Section ground="paper" rhythm="beat" aria-labelledby="tipos-titulo">
        <Container width="wide">
          <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
            <Reveal className="lg:col-span-6">
              <Prose paragraphs={page.paragraphs} lead />
            </Reveal>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={90}>
                <Eyebrow as="h2" id="tipos-titulo">
                  {page.kinds.label}
                </Eyebrow>
              </Reveal>

              <ul className="mt-lg flex flex-col gap-2xs">
                {page.kinds.items.map((item, i) => (
                  <Reveal
                    key={item}
                    as="li"
                    delay={Math.min(i, 3) * 60 + 120}
                    className="font-serif text-lg font-light leading-snug text-fg-strong"
                  >
                    {item}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/*
        Commissions already made. The page argues that a portrait starts with a
        conversation; four finished pieces are the only evidence that carries
        real weight, and they cost no extra copy.
      */}
      {commissioned.length > 0 ? (
        <Section
          ground="paper"
          rhythm="beat"
          aria-labelledby="realizados-titulo"
        >
          <Container width="wide">
            <Reveal>
              <Eyebrow as="h2" id="realizados-titulo">
                Encargos realizados
              </Eyebrow>
            </Reveal>

            <ul className="mt-2xl grid grid-cols-2 gap-lg md:grid-cols-4 md:gap-x-[2vw]">
              {commissioned.map((work, i) => (
                <li key={work.slug}>
                  <Reveal variant="image" delay={Math.min(i, 3) * 90}>
                    <ArtworkFrame
                      work={work}
                      ratio="portrait"
                      sizes="(min-width: 768px) 22vw, 45vw"
                    />
                  </Reveal>
                  <Reveal delay={Math.min(i, 3) * 90 + 120} className="mt-md">
                    <WorkMeta work={work} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* How it happens. */}
      <ProcessList
        block={page.process}
        ground="chamber"
        headingId="proceso-encargo-titulo"
      />

      {/*
        Two commissions being made. The five stages above describe the process;
        these show it, which is the one thing a list of stages cannot do.
      */}
      {filmed.length > 0 ? (
        <Section ground="paper" rhythm="beat" aria-labelledby="filmados-titulo">
          <Container width="wide">
            <Reveal>
              <Eyebrow as="h2" id="filmados-titulo">
                Obras en proceso
              </Eyebrow>
            </Reveal>

            <ul className="mt-2xl grid grid-cols-1 gap-xl sm:grid-cols-2 sm:gap-x-[4vw]">
              {filmed.map((work, i) => (
                <li key={work.slug}>
                  <Reveal variant="image" delay={i * 120}>
                    <SilentVideo
                      youtubeId={work.processVideo?.youtubeId}
                      src={work.processVideo?.src}
                      poster={work.processVideo?.poster}
                      label={work.processVideo?.label ?? work.title}
                      caption={`${work.title}, ${work.year}`}
                      aspect={
                        work.processVideo?.portrait
                          ? "aspect-[9/16] sm:aspect-[3/4]"
                          : "aspect-video"
                      }
                      className="mx-auto max-w-[24rem]"
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* The practical detail, declared rather than invented. */}
      <PendingTopics
        eyebrow={page.practical.eyebrow}
        title={page.practical.title}
        topics={page.practical.topics}
        note="Estos apartados están definidos pero todavía no tienen texto aprobado. Se completan con los formatos, tiempos y condiciones reales de Mariela."
        headingId="practico-titulo"
      />

      <ContactCallout
        content={page.closing}
        headingId="cierre-encargos-titulo"
      />
    </>
  );
}
