import { Container } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { CoverImage } from "@/components/home/CoverImage";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { HeroContent } from "@/content/types";

interface HeroProps {
  content: HeroContent;
}

/**
 * The opening: one cover band, with the sentence set over it on the left.
 *
 * The type sits on the image rather than under it, ranged left on the same
 * axis the rest of the page uses. Centred type over a photograph has nowhere
 * to align to and drifts; a left edge gives every line the same start and
 * reads as composed. Contrast comes from the scrim inside CoverImage, so the
 * words stay legible without a panel behind them.
 *
 * `data-ground="paper"` because the portada is a pale wall — measured at 0.72
 * luminance where the sentence sits. Light type would need the picture
 * darkened to work, and darkening a photograph to make room for words is
 * exactly the kind of shouting the brief rules out. Dark type on a light veil
 * leaves the work as it was photographed.
 */
export function Hero({ content }: HeroProps) {
  return (
    <section
      data-ground="paper"
      aria-labelledby="hero-titulo"
      className="relative isolate text-fg"
    >
      <CoverImage
        src={content.cover?.src ?? null}
        alt={content.cover?.alt ?? ""}
        mobileSrc={content.cover?.mobileSrc}
        focus={content.cover?.focus}
        scrim="light"
      />

      {/*
        The type layer. It is absolutely placed on wide screens so the band
        keeps its exact 1920 × 750 proportion, and returns to normal flow
        under `sm`, where a phone-sized crop has no room to hold both.
      */}
      <div className="inset-0 bg-bg px-0 pb-2xl pt-xl sm:absolute sm:flex sm:items-end sm:bg-transparent sm:pb-3xl sm:pt-0">
        <Container width="wide" className="w-full">
          <div className="max-w-[46ch]">
            <Reveal>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={120} className="mt-md">
              <Display as="h1" size="cover" id="hero-titulo" measure={20}>
                {content.title}
              </Display>
            </Reveal>

            <Reveal delay={240} className="mt-lg">
              <p className="max-w-[52ch] font-sans text-base leading-relaxed text-pretty text-fg">
                {content.description}
              </p>
            </Reveal>

            <Reveal
              delay={360}
              className="mt-xl flex flex-wrap items-center gap-x-lg gap-y-md"
            >
              <ActionButton href={content.primaryAction.href}>
                {content.primaryAction.label}
              </ActionButton>
              <QuietLink href={content.secondaryAction.href}>
                {content.secondaryAction.label}
              </QuietLink>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
