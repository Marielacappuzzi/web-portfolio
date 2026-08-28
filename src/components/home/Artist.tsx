import { Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Figure } from "@/components/primitives/Figure";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow, Prose } from "@/components/primitives/Type";
import type { HomeArtistContent } from "@/content/types";

/**
 * Mariela, introduced before the work.
 *
 * Text left, photograph right — the mirror of /sobre-mi, where the portrait
 * sits on the left. The two pages then never read as the same block repeated,
 * which is the whole reason for the flip.
 *
 * The photograph follows the same principle: she is at her worktable with the
 * charcoal in her hand, the pencils laid out and the reference on screen. A
 * posed portrait would say who she is; this one also says what she does.
 */
export function Artist({ content }: { content: HomeArtistContent }) {
  return (
    <Section
      id="sobre-mariela"
      ground="paper"
      rhythm="act"
      aria-labelledby="artista-titulo"
    >
      {/*
        Text left, photograph right, and the photograph takes the whole right
        side rather than a column inside the grid: five of twelve for the
        words, seven for the picture, running out to the edge of the screen.

        The section drops its gutter and the text column carries its own, so
        the picture can reach the edge without the words losing the page's
        axis. The same arrangement as "Mi manera de mirar" on /sobre-mi — the
        two blocks are the same kind of thing and were being set two ways.
      */}
      <div className="grid items-center gap-2xl lg:grid-cols-12 lg:gap-x-[3vw]">
          <div className="gutter lg:col-span-5 lg:ml-auto lg:w-full lg:max-w-[38rem] lg:pr-0">
            {content.eyebrow ? (
              <Reveal>
                <Eyebrow>{content.eyebrow}</Eyebrow>
              </Reveal>
            ) : null}

            <Reveal delay={90} className="mt-lg">
              <Display id="artista-titulo" measure={22}>
                {content.title}
              </Display>
            </Reveal>

            <Reveal delay={180} className="mt-xl">
              <Prose paragraphs={content.paragraphs} />
            </Reveal>

            <Reveal delay={270} className="mt-xl">
              <ActionButton href={content.action.href}>
                {content.action.label}
              </ActionButton>
            </Reveal>
          </div>

          {/*
            Full width on a phone, and no passepartout: `bare` drops the mat,
            which was holding a photograph of her at the board inside a framed
            box with margins on both sides. Here the picture is the block.
          */}
          <Reveal variant="image" delay={120} className="lg:col-span-7">
            <Figure
              src={content.image.src}
              alt={content.image.alt}
              pendingLabel="Mariela trabajando"
              aspect="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]"
              focus="50% 40%"
              sizes="(min-width: 1024px) 58vw, 100vw"
              bare
              zoomOnHover
            />
          </Reveal>
        </div>
    </Section>
  );
}
