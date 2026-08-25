import Link from "next/link";
import { Container, Section } from "@/components/layout/Section";
import { Badge } from "@/components/primitives/Badge";
import { Reveal } from "@/components/primitives/Reveal";
import { ArrowRightIcon } from "@/components/primitives/Icon";
import { Display } from "@/components/primitives/Type";
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
 * label stays because it is what orients the sequence; everything else lives
 * on /obra and the editorial pages.
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
      aria-labelledby="destacadas-titulo"
    >
      <Container width="wide">
        <Reveal className="flex justify-center">
          <Display
            as="h2"
            id="destacadas-titulo"
            size="section"
            className="text-center"
          >
            {content.eyebrow}
          </Display>
        </Reveal>

        <ul className="mt-2xl grid grid-cols-1 gap-3xl md:mt-3xl md:grid-cols-3 md:gap-x-[3vw]">
          {works.map((work, i) => (
            <li key={work.slug} className="group flex">
              <Link href={`/obra/${work.slug}`} className="flex w-full flex-col">
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
                  {work.concept ? <Badge>{work.concept}</Badge> : null}
                  <p className="mt-xs font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
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
                    {work.featuredLinkLabel ?? "Descubrir la obra"}
                    <ArrowRightIcon
                      className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </span>
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
