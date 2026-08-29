import { Container, Section } from "@/components/layout/Section";
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
        Back inside the page container.

        Bleeding to the edge is what made this photograph enormous: six columns
        of a full-width grid is 960px on a 1920 screen, and at the file's own
        2/3 that is 1440px tall — taller than the viewport. Inside the 90rem
        column the same five columns come out at 600 x 900, which is a portrait
        photograph shown whole rather than a picture the page is built around.
      */}
      <Container width="wide">
        <div className="grid items-center gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
          <div className="lg:col-span-6">
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
            The photograph whole, in its own proportion. `width`/`height` on
            Figure make the frame take the file's ratio, so nothing is cropped
            — which is the point: it is a vertical picture and it is shown
            vertical, top to bottom.

            Matted, like the flagship row above it. `bare` was dropping the
            passepartout, so this was the one photograph on the home standing
            on the page with no edge while the three works beside it had one.
          */}
          <Reveal variant="image" delay={120} className="lg:col-span-5 lg:col-start-8">
            <Figure
              src={content.image.src}
              alt={content.image.alt}
              pendingLabel="Mariela trabajando"
              width={1280}
              height={1920}
              sizes="(min-width: 1024px) 40vw, 100vw"
              zoomOnHover
            />
          </Reveal>
          </div>
        </Container>
    </Section>
  );
}
