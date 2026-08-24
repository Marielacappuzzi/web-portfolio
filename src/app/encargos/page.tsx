import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { PendingTopics } from "@/components/blocks/PendingTopics";
import { ProcessList } from "@/components/blocks/ProcessList";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { VideoPlayer } from "@/components/primitives/VideoPlayer";
import { Eyebrow, Prose } from "@/components/primitives/Type";
import { ArtworkFrame } from "@/components/work/ArtworkFrame";
import { WorkIdentity, WorkSpecs } from "@/components/work/WorkMeta";
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
          /*
           * A real photograph, not a staged interior. The mockup showed a
           * framed print in a living room; this shows the artist beside a
           * finished piece, which carries the scale of the work and the fact
           * that a person made it — the two things a commission page has to
           * establish before anything else.
           */
          src: "/estudio/mariela-con-obra.jpg",
          alt: "Mariela Crapuzzi de pie junto al retrato terminado de Molly, montado sobre un caballete en su estudio.",
          aspect: "aspect-[4/5]",
          caption: "Junto a «Molly», una vez terminada.",
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

            {/*
              One column on a phone. Two half-width portraits side by side
              leave each piece about 160px wide — too small to read a charcoal
              at, which is the only reason the row exists.
            */}
            <ul className="mt-2xl grid grid-cols-1 gap-2xl sm:grid-cols-2 sm:gap-lg md:grid-cols-4 md:gap-x-[2vw]">
              {commissioned.map((work, i) => (
                <li key={work.slug}>
                  <Reveal variant="image" delay={Math.min(i, 3) * 90}>
                    <ArtworkFrame
                      work={work}
                      ratio="portrait"
                      sizes="(min-width: 768px) 22vw, (min-width: 640px) 45vw, 92vw"
                    />
                  </Reveal>
                  <Reveal delay={Math.min(i, 3) * 90 + 120} className="mt-md">
                    <WorkIdentity work={work} />
                    <WorkSpecs work={work} className="mt-sm" />
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
                    <VideoPlayer
                      src={work.processVideos![0].src}
                      poster={work.processVideos![0].poster}
                      label={work.processVideos![0].label ?? work.title}
                      caption={`${work.title}, ${work.year}`}
                      aspect={
                        work.processVideos![0].portrait
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
