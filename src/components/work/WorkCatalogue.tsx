"use client";

import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { WorkGrid } from "./WorkGrid";
import { Container, Section } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Type";
import type { Work } from "@/content/types";

interface WorkCatalogueProps {
  featured: Work[];
  rest: Work[];
  featuredEyebrow: string;
  restEyebrow: string;
  emptyMessage: string;
}

/**
 * The gallery: the flagships, then everything else, under one lightbox.
 *
 * The two groups are two sections on the page but one run in the panel. Giving
 * each grid its own lightbox would have been less code and worse: "siguiente"
 * would stop at the bottom of whichever group you happened to open from, which
 * is a seam the reader can feel and cannot explain. Ordered flagships-first, so
 * moving through the panel follows the same sequence as scrolling the page.
 *
 * Only the pieces without an editorial page go into the run. The two that have
 * one lead there instead, and a panel that sometimes opened a picture and
 * sometimes navigated away would be the worst of both.
 */
export function WorkCatalogue({
  featured,
  rest,
  featuredEyebrow,
  restEyebrow,
  emptyMessage,
}: WorkCatalogueProps) {
  const openable = [...featured, ...rest].filter(
    (work) => !work.hasEditorialPage,
  );
  const [index, setIndex] = useState<number | null>(null);

  const open = (work: Work) => {
    const i = openable.indexOf(work);
    if (i !== -1) setIndex(i);
  };

  return (
    <>
      {/*
        The flagships, grouped and on their own ground. Mixed into one grid the
        site's only real hierarchy — these carry the argument, the rest is the
        catalogue — was invisible. A slightly lighter ground separates them
        without raising the contrast enough to read as a different site.
      */}
      {featured.length > 0 ? (
        <Section
          ground="paper-bright"
          rhythm="act"
          aria-labelledby="destacadas-titulo"
        >
          <Container width="wide">
            <Reveal>
              <Eyebrow as="h2" id="destacadas-titulo">
                {featuredEyebrow}
              </Eyebrow>
            </Reveal>

            <WorkGrid works={featured} onOpen={open} className="mt-2xl" />
          </Container>
        </Section>
      ) : null}

      <Section ground="paper" rhythm="act" aria-labelledby="todas-titulo">
        <Container width="wide">
          <Reveal>
            <Eyebrow as="h2" id="todas-titulo">
              {restEyebrow}
            </Eyebrow>
          </Reveal>

          {rest.length > 0 ? (
            <WorkGrid works={rest} onOpen={open} className="mt-2xl" />
          ) : (
            <Reveal className="mt-2xl">
              <p className="max-w-[52ch] font-sans text-base leading-relaxed text-fg-muted">
                {emptyMessage}
              </p>
            </Reveal>
          )}
        </Container>
      </Section>

      <Lightbox
        works={openable}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}
