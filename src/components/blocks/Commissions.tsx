import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { Ground } from "@/components/layout/Section";
import type { HomeCommissionsContent } from "@/content/types";

/**
 * Commissions — the block every page closes on.
 *
 * It began on the home and now ends /obra and /sobre-mi too, which is why it
 * lives in blocks rather than in home. Each of those pages used to finish on a
 * contact callout, asking a second question straight after the one the page
 * had been building towards.
 *
 * What can be asked for, and the way to ask. No stages, no examples, no
 * finished pieces: the gallery is two sections above and every commission in
 * it already says so on its label.
 *
 * The four kinds are set as a list on rules rather than as a sentence. Stacked
 * at a paragraph's leading they read as one line broken oddly, and the whole
 * point is that these are four distinct things a person can ask for — someone
 * scanning for "mascota" should find it in a second.
 */
interface CommissionsProps {
  content: HomeCommissionsContent;
  /**
   * `chamber` by default. /sobre-mi passes paper, because the section above it
   * is already chamber and two dark grounds in a row read as one long block
   * with a heading in the middle of it.
   */
  ground?: Ground;
}

export function Commissions({ content, ground = "chamber" }: CommissionsProps) {
  return (
    <Section
      ground={ground}
      rhythm="act"
      id="encargos"
      aria-labelledby="encargos-home-titulo"
    >
      <Container width="wide">
        <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[5vw]">
          <div className="lg:col-span-6">
            {content.eyebrow ? (
              <Reveal>
                <Eyebrow>{content.eyebrow}</Eyebrow>
              </Reveal>
            ) : null}

            <Reveal delay={90} className="mt-lg">
              <Display id="encargos-home-titulo" measure={20}>
                {content.title}
              </Display>
            </Reveal>

            <Reveal delay={180} className="mt-xl">
              <p className="max-w-[52ch] font-sans text-base leading-relaxed text-pretty text-fg">
                {content.paragraph}
              </p>
            </Reveal>

            <Reveal delay={270} className="mt-xl">
              <ActionButton href={content.action.href}>
                {content.action.label}
              </ActionButton>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ul>
              {content.kinds.map((kind, i) => (
                <Reveal
                  key={kind}
                  as="li"
                  delay={Math.min(i, 3) * 60 + 150}
                  className="border-t border-rule py-md font-serif text-lg font-light leading-snug text-fg-strong last:border-b"
                >
                  {kind}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
