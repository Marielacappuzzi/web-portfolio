import { Container, Section } from "./Section";
import { Figure } from "@/components/primitives/Figure";
import { Reveal } from "@/components/primitives/Reveal";
import { Rule } from "@/components/primitives/Rule";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { SectionHeading } from "@/content/types";
import { cn } from "@/lib/cn";

interface PageHeaderImage {
  src: string;
  alt: string;
  aspect?: string;
  caption?: string;
}

interface PageHeaderProps {
  /** Draw the hairline that closes the header. Default true. */
  rule?: boolean;
  heading: SectionHeading;
  /** One short paragraph at most. Longer text belongs in the page body. */
  lead?: string;
  /** Sits beside the title on wide screens, under it on narrow ones. */
  image?: PageHeaderImage;
}

/**
 * How every internal page opens: eyebrow, title, a drawn rule.
 *
 * The extra top padding clears the fixed header and gives the title the same
 * arrival the hero gets — the page begins with air, not with content pushed
 * against the navigation.
 */
export function PageHeader({
  heading,
  lead,
  image,
  rule = true,
}: PageHeaderProps) {
  const withImage = Boolean(image);

  return (
    <Section
      ground="paper"
      rhythm="none"
      className="pb-3xl pt-40 md:pt-48"
      aria-labelledby="pagina-titulo"
    >
      <Container width="wide">
        <div
          className={cn(
            withImage &&
              "grid items-center gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]",
          )}
        >
          <div className={cn(withImage && "lg:col-span-6")}>
            {heading.eyebrow ? (
              <Reveal>
                <Eyebrow>{heading.eyebrow}</Eyebrow>
              </Reveal>
            ) : null}

            <Reveal delay={90} className="mt-md">
              <Display as="h1" id="pagina-titulo">
                {heading.title}
              </Display>
            </Reveal>

            {lead ? (
              <Reveal delay={180} className="mt-lg">
                <p className="max-w-[52ch] font-sans text-lg leading-relaxed text-pretty text-fg">
                  {lead}
                </p>
              </Reveal>
            ) : null}
          </div>

          {image ? (
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal variant="image" delay={180}>
                <Figure
                  src={image.src}
                  alt={image.alt}
                  pendingLabel=""
                  aspect={image.aspect ?? "aspect-square"}
                  caption={image.caption}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </Reveal>
            </div>
          ) : null}
        </div>

        {/*
          The closing rule is optional. On /obra the section straight below is
          "Obras destacadas" on its own darker ground, and a full-width hairline
          immediately above that edge draws two lines where the page needs one.
        */}
        {rule ? <Rule width="full" className="mt-3xl" delay={270} /> : null}
      </Container>
    </Section>
  );
}
