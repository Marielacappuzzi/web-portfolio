import { Container, Section } from "@/components/layout/Section";
import { Figure } from "@/components/primitives/Figure";
import { Reveal } from "@/components/primitives/Reveal";
import { Rule } from "@/components/primitives/Rule";
import { Display, Eyebrow, PullQuote } from "@/components/primitives/Type";
import { withEmphasis } from "@/lib/emphasis";
import type { HomeStatementContent } from "@/content/types";

/**
 * The differentiator, at its shortest, on a centred axis.
 *
 * Everything sits on one column down the middle: label, statement, the
 * sentence to carry away, and then the gaze itself.
 *
 * Kept compact on purpose. It carries the two sentences the whole site turns
 * on and nothing else — no reasoning, no way out to another page — because
 * Mariela now follows immediately, and a long manifesto before her was
 * delaying the one thing the home most needs to establish: that there is a
 * person behind the gaze. Losing height here costs the idea nothing.
 */
export function Statement({ content }: { content: HomeStatementContent }) {
  return (
    <Section ground="paper" rhythm="beat" aria-labelledby="declaracion-titulo">
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={90} className="mt-lg">
            <Display id="declaracion-titulo" measure={24} className="mx-auto">
              {content.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {withEmphasis(line)}
                </span>
              ))}
            </Display>
          </Reveal>

          <Rule width="short" className="mt-xl" />

          <Reveal delay={180} className="mt-xl">
            <PullQuote className="mx-auto max-w-[30ch]">
              {content.pullQuote}
            </PullQuote>
          </Reveal>
        </div>

        {/*
          The gaze itself, cropped from "Oltre lo Sguardo" — whose title means
          "beyond the gaze". It closes the section as evidence rather than
          illustration: the text says the eyes are where the piece begins, and
          this is what that looks like at the scale Mariela draws it.
        */}
        <Reveal variant="image" className="mt-3xl block">
          <Figure
            src="/obra/oltre-lo-sguardo/mirada.jpg"
            alt="Recorte ampliado de la obra Oltre lo Sguardo sobre los ojos de la figura, con el detalle del carboncillo en las pestañas y el iris."
            pendingLabel=""
            aspect="aspect-[5/2]"
            sizes="(min-width: 1024px) 88vw, 100vw"
            caption="Oltre lo Sguardo, 2024"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
