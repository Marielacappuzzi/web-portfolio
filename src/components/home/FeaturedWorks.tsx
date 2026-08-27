import Link from "next/link";
import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { ArrowRightIcon } from "@/components/primitives/Icon";
import { Display, Eyebrow } from "@/components/primitives/Type";
import { withEmphasis } from "@/lib/emphasis";
import { ArtworkFrame } from "@/components/work/ArtworkFrame";
import type { HomeFeaturedContent, Work } from "@/content/types";
import { cn } from "@/lib/cn";

interface FeaturedWorksProps {
  content: HomeFeaturedContent;
  works: Work[];
}

/**
 * The three narrative pieces: origin → interpretation → a voice of her own.
 *
 * Images and names only. Yulia Bas's homepage carries no captions at all — the
 * work is the argument and the project name is the entry point. The concept
 * labels that used to head each card are gone with everything else: they read
 * as three more things to take in above three titles, on the one screen that
 * should ask nothing of the visitor. What each piece is about is on its page.
 *
 * The three cards share one 4/5 frame. Elsewhere each piece keeps its own
 * proportion, but here they are read as a row: with native ratios the titles
 * land at three different heights and the row reads as an accident rather than
 * a sequence. This is the one place a shared crop earns its cost.
 *
 * No headline of its own — none exists in the approved copy, and the concept
 * labels already do the orienting.
 */
export function FeaturedWorks({ content, works }: FeaturedWorksProps) {
  if (works.length === 0) return null;

  return (
    <Section
      ground="paper-bright"
      rhythm="act"
      id="obras"
      aria-labelledby="destacadas-titulo"
    >
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow as="h2" id="destacadas-titulo">
              {content.eyebrow}
            </Eyebrow>
          </Reveal>

          {/*
            The one poetic line the home keeps, and the only place it appears.
            It used to open the site, above a photograph of a studio wall it was
            not describing; here it sits over three drawings whose whole subject
            is a gaze, which is the sentence doing its job instead of setting a
            mood.
          */}
          {content.line ? (
            <Reveal delay={90} className="mt-lg">
              <Display size="section" measure={26} className="mx-auto">
                {withEmphasis(content.line)}
              </Display>
            </Reveal>
          ) : null}
        </div>

        <ul className="mt-2xl grid grid-cols-1 gap-3xl md:mt-3xl md:grid-cols-3 md:gap-x-[3vw]">
          {works.map((work, i) => (
            <li key={work.slug} className="group flex">
              {/*
                Two destinations, because only two of the three still have a
                page. A piece without one goes to its card in the gallery,
                where it opens in the lightbox — never to a URL that 404s or,
                worse, to a page that exists only to hold a title.
              */}
              <Link
                href={
                  work.hasEditorialPage
                    ? `/obra/${work.slug}`
                    : `/obra#${work.slug}`
                }
                className="flex w-full flex-col"
              >
                <Reveal variant="image" delay={i * 120}>
                  <ArtworkFrame
                    work={work}
                    aspect="aspect-[4/5]"
                    focus="50% 30%"
                    sizes="(min-width: 768px) 30vw, 100vw"
                    zoomOnHover
                  />
                </Reveal>

                <Reveal delay={i * 120 + 120} className="mt-md">
                  <p className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
                    {work.title}
                  </p>

                  {/*
                    Each piece says where it leads. The card was clickable but
                    silent about it, so the three works that have a page of
                    their own looked exactly like the ones that do not.

                    Rendered as a span, not a link: it lives inside the card’s
                    own anchor, and nesting one inside another is invalid.
                  */}
                  <span
                    className={cn(
                      "mt-md inline-flex items-center gap-2xs py-2xs",
                      "font-sans text-2xs font-medium uppercase tracking-label",
                      "border-b border-fg-muted text-fg-strong",
                      "transition-colors duration-300 group-hover:border-fg-strong",
                    )}
                  >
                    {work.hasEditorialPage
                      ? (work.featuredLinkLabel ?? "Descubrir la obra")
                      : "Ver la obra"}
                    <ArrowRightIcon
                      className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </span>
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>

        {/* The catalogue lives on /obra now, so the home has to point there. */}
        <Reveal className="mt-3xl flex justify-center">
          <ActionButton href={content.action.href}>
            {content.action.label}
          </ActionButton>
        </Reveal>
      </Container>
    </Section>
  );
}
