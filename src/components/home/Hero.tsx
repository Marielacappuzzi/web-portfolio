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
        /*
          A real height on a phone, not a proportion. `aspect-[2/3]` gave 585px
          on a 390px screen, and the picture, the name, the role, a paragraph
          and two buttons were all being squeezed into it — the image cropped
          to nothing and the type packed against it. 90svh is the screen minus
          the browser chrome, which is what `svh` measures and `vh` does not.
          From `sm` the height is released and the proportions take over again.
        */
        aspect="h-[90svh] sm:h-auto sm:aspect-[16/9] lg:aspect-[1920/750]"
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
          {/*
            Measured in rem, not in `ch`.

            `ch` resolves against the element's own font — this wrapper is
            Instrument Sans at 17px, so `34ch` came out at roughly 290px. The
            name was then set at up to 92px inside a 290px column: it broke
            across two lines, overflowed the column, and pushed the buttons
            past the foot of the band, which is why they were being cut off.
          */}
          <div className="max-w-[26rem] sm:max-w-[32rem] lg:max-w-[38rem]">
            {content.eyebrow ? (
              <Reveal>
                <Eyebrow>{content.eyebrow}</Eyebrow>
              </Reveal>
            ) : null}

            <Reveal>
              {/*
                Down a second step, to `section` — 4rem at its widest. It went
                7rem, then 5.75rem, and at both it was still tall enough to
                push the rest of the block past the bottom edge of the band.
                It remains the largest type on the site.

                One line, always: "Mariela Crapuzzi" is sixteen characters and
                fits the 38rem column at this size, which is what makes it read
                as a name rather than as two stacked words.
              */}
              <Display
                as="h1"
                size="section"
                id="hero-titulo"
                measure={20}
                className="leading-none"
              >
                {content.title}
              </Display>
            </Reveal>

            {content.subtitle ? (
              <Reveal delay={120} className="mt-xs">
                {/*
                  What she does, and it has to be read. It was at the body size
                  in the muted tone, so the one line that answers "what is this
                  site" was the quietest thing on the screen. Up a step, at
                  full strength, and medium — enough to hold its own under the
                  name without competing with it.
                */}
                <p className="font-sans text-lg font-medium leading-snug text-fg-strong">
                  {content.subtitle}
                </p>
              </Reveal>
            ) : null}

            {/*
              The three blocks under the name sit closer together now. At
              sm/lg/xl they read as four separate things stacked in a column;
              the name, the role and the sentence are one introduction.
            */}
            <Reveal delay={240} className="mt-md">
              <p className="max-w-[46ch] font-sans text-sm leading-relaxed text-pretty text-fg">
                {content.description}
              </p>
            </Reveal>

            <Reveal
              delay={360}
              /*
                One row, never two, at any width.

                `flex-nowrap` alone was not enough on a phone: the two labels
                were free to shrink, so each wrapped inside itself and the pair
                read as one stacked block. `shrink-0` and `whitespace-nowrap`
                hold them on a single line, and the gap tightens below `sm` so
                they clear a 390px screen — measured at roughly 328px for the
                pair, against 350px of column.
              */
              className="mt-lg flex flex-nowrap items-center gap-x-md sm:gap-x-lg [&>*]:shrink-0 [&>*]:whitespace-nowrap"
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
