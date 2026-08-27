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
 * The opening: one full-width band, her name set into the left of it.
 *
 * Full width and one column — not a split screen. The photograph is of Mariela
 * at the easel, and cutting it in half to make room for a text panel would
 * throw away the half that shows her working.
 *
 * The composition does the layout work: the left third of the landscape frame
 * is bare studio wall, so the type sits there without covering anything. On a
 * phone the portrait file carries its own dark field below the picture, and
 * the words sit in it — over the image, as asked, rather than pushed under it.
 *
 * `data-ground="chamber"` so the type renders light. The photograph is warm
 * and mid-toned, and white on it needs the scrim underneath to hold.
 */
export function Hero({ content }: HeroProps) {
  return (
    <section
      id="inicio"
      data-ground="chamber"
      aria-labelledby="hero-titulo"
      className="relative isolate scroll-mt-24 text-fg"
    >
      <CoverImage
        src={content.cover?.src ?? null}
        alt={content.cover?.alt ?? ""}
        mobileSrc={content.cover?.mobileSrc}
        focus={content.cover?.focus}
        /*
          Tall enough on a phone to hold the picture and the words beneath it
          without either being squeezed; the landscape file's own 1920 × 750
          from `sm` up.
        */
        aspect="aspect-[2/3] sm:aspect-[16/9] lg:aspect-[1920/750]"
        scrim="dark"
      />

      {/*
        The type layer.

        Absolutely placed from `sm` so the band keeps its exact proportion, and
        pinned to the lower half on a phone, where the portrait file leaves a
        dark field for it. `pt-32` clears the fixed header at every width —
        the brief is explicit that nothing may sit under it.
      */}
      <div className="absolute inset-0 flex items-end pb-2xl pt-32 sm:items-center sm:pb-0">
        <Container width="wide" className="w-full">
          <div className="max-w-[30ch] sm:max-w-[34ch]">
            {content.eyebrow ? (
              <Reveal>
                <Eyebrow>{content.eyebrow}</Eyebrow>
              </Reveal>
            ) : null}

            <Reveal>
              <Display as="h1" size="hero" id="hero-titulo" measure={14}>
                {content.title}
              </Display>
            </Reveal>

            {content.subtitle ? (
              <Reveal delay={120} className="mt-sm">
                <p className="font-sans text-base leading-snug text-fg">
                  {content.subtitle}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={240} className="mt-lg">
              <p className="max-w-[46ch] font-sans text-sm leading-relaxed text-pretty text-fg">
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
