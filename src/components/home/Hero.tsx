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
      /*
        The header is fixed, so the band has to begin where the header ends.

        It used to start at the top of the document and the picture ran up
        behind the bar — the monogram and the links sat on the photograph, and
        the top of the frame was cut by chrome rather than composed. The
        offset matches the header's own height exactly, 4rem on a phone and
        5rem from `md`, so the two meet on a line instead of overlapping.
      */
      className="relative isolate mt-16 scroll-mt-24 text-fg md:mt-20"
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
          A real height at both ends, a proportion only in the middle.

          On a phone `aspect-[2/3]` gave 585px on a 390px screen, and the
          picture, the name, the role, a paragraph and two buttons were all
          squeezed into it. 90svh was better and still not enough — the block
          of type is about 400px tall, so it needs the whole screen if the
          photograph is to keep any of it. On a wide screen `1920/750` is
          2.56:1, which on a tall monitor is a band with the page already
          showing beneath it.
          Both ends now take the screen: `svh` rather than `vh`, because on a
          phone `vh` measures past the browser chrome and cuts the foot off.
          Between them the file keeps its own 16/9.
        */
        /*
          The screen less the header, not the whole screen.

          The band now starts below the fixed bar, so asking for `100svh` on
          top of that offset makes the page taller than the viewport and pushes
          the foot of the composition — the buttons — out of sight. Subtracting
          the header's own height keeps the opening exactly one screen.
        */
        aspect="h-[calc(100svh-4rem)] sm:h-auto sm:aspect-[16/9] lg:h-[calc(100svh-5rem)] lg:aspect-auto"
        scrim="dark"
      />

      {/*
        The type layer.

        Absolutely placed from `sm` so the band keeps its exact proportion, and
        pinned to the lower half on a phone, where the portrait file leaves a
        dark field for it. `pt-32` clears the fixed header at every width —
        the brief is explicit that nothing may sit under it.
      */}
      {/*
        `items-end` on a phone, so the block sits at the foot of the frame and
        her face and the drawing stay clear above it. It used to be centred,
        which put the name across the middle of the picture — over her hand and
        the lioness. Centred again from `sm`, where the band is wide and the
        type has a column of its own.
      */}
      {/*
        On a phone the block sits low in the frame, over the dark field the
        photograph carries at its foot, and the top of the picture is left to
        Mariela and the drawing.

        `pb` rather than a fixed offset, so it moves with the screen instead of
        being tuned for one handset: `pb-lg` at 320px where every pixel of
        height is contested, `pb-md` from `xs` up where there is room to let it
        sit lower still. Between them the block lands roughly 50-70px further
        down than it did at `pb-2xl`, which is what the correction asked for,
        and it keeps clear of the bottom edge at both ends of the range.
      */}
      {/*
        `pt-lg`, not `pt-32`. The tall padding was clearing the fixed header
        from the inside; the band now starts below it, so the same allowance
        applied twice was pushing the block down the frame for no reason.
      */}
      <div className="absolute inset-0 flex items-end pb-lg pt-lg min-[380px]:pb-md sm:items-center sm:pb-0">
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
                Stacked on a phone, side by side from `sm`.

                Holding them on one row below `sm` did not work: the pair needs
                about 328px and a 390px screen leaves 350px of column, so
                "Solicitar un encargo" ran off the right edge with its
                underline trailing past the screen. Two full-width rows is the
                honest answer at that width — both actions readable, neither
                clipped.
              */
              className="mt-lg flex flex-col items-start gap-y-md sm:flex-row sm:flex-nowrap sm:items-center sm:gap-x-lg sm:gap-y-0 sm:[&>*]:shrink-0 sm:[&>*]:whitespace-nowrap"
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
