import Link from "next/link";
import { Container, Section } from "@/components/layout/Section";
import { Badge } from "@/components/primitives/Badge";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Type";
import { ArtworkFrame } from "@/components/work/ArtworkFrame";
import type { HomeFeaturedContent, Work } from "@/content/types";

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
          <Eyebrow as="h2" id="destacadas-titulo">
            {content.eyebrow}
          </Eyebrow>
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
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
