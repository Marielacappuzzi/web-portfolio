import Link from "next/link";
import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
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

        <ul className="mt-4xl grid grid-cols-1 gap-3xl md:grid-cols-3 md:gap-x-[3vw]">
          {works.map((work, i) => (
            <li key={work.slug} className="group">
              <Link href={`/obra/${work.slug}`} className="block">
                <Reveal variant="image" delay={i * 120}>
                  <ArtworkFrame
                    work={work}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className={
                      work.image
                        ? "transition-transform duration-900 ease-out-quart group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        : undefined
                    }
                  />
                </Reveal>

                <Reveal delay={i * 120 + 120} className="mt-md">
                  {work.concept ? <Eyebrow as="p">{work.concept}</Eyebrow> : null}
                  <p className="mt-2xs font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
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
