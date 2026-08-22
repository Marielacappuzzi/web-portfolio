import Link from "next/link";
import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Badge } from "@/components/primitives/Badge";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import { ArtworkFrame } from "@/components/work/ArtworkFrame";
import type { HomeWorkContent, Work } from "@/content/types";

interface WorkSelectionProps {
  content: HomeWorkContent;
  works: Work[];
}

/**
 * The three narrative pieces, on the home, as images and names only.
 *
 * Yulia Bas's homepage carries no captions at all — the work is the argument
 * and the project name is the entry point. This keeps the concept label
 * (origin → interpretation → a voice of her own) because it is what orients the
 * sequence, and sends everything else to /obra and the editorial pages.
 *
 * The three cards share one 4/5 frame. Elsewhere on the site each piece keeps
 * its own proportion, but here they are read as a row: with native ratios the
 * titles land at three different heights and the row reads as an accident
 * rather than a sequence. This is the one place a shared crop earns its cost.
 */
export function WorkSelection({ content, works }: WorkSelectionProps) {
  if (works.length === 0) return null;

  return (
    <Section ground="paper" rhythm="act" aria-labelledby="obra-titulo">
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={90} className="mt-lg">
            <Display id="obra-titulo" measure={24} className="mx-auto">
              {content.title}
            </Display>
          </Reveal>
        </div>

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
                    className={
                      work.image
                        ? "transition-transform duration-900 ease-out-quart group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        : undefined
                    }
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

        <Reveal className="mt-3xl flex justify-center">
          <ActionButton href={content.action.href}>
            {content.action.label}
          </ActionButton>
        </Reveal>
      </Container>
    </Section>
  );
}
