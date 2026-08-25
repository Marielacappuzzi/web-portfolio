import { Container, Section } from "@/components/layout/Section";
import type { Ground } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Display, Eyebrow } from "@/components/primitives/Type";
import type { FaqItem } from "@/content/types";

interface FaqProps {
  eyebrow: string;
  title: string;
  items: FaqItem[];
  ground?: Ground;
  id?: string;
  headingId?: string;
}

/**
 * Frequently asked questions, as native disclosures.
 *
 * `<details>` and `<summary>` do the whole job: keyboard operable, announced
 * correctly, open to the right panel when a browser searches the page, and
 * printable expanded. A hand-built accordion would need state, ARIA wiring and
 * a key handler to reach the same place, and would still break Ctrl+F.
 *
 * The marker is a hairline cross that becomes a minus when open — the same 1px
 * weight as every rule on the site, rather than a chevron borrowed from an
 * interface kit.
 */
export function Faq({
  eyebrow,
  title,
  items,
  ground = "paper",
  id,
  headingId,
}: FaqProps) {
  if (items.length === 0) return null;

  return (
    <Section ground={ground} rhythm="act" id={id} aria-labelledby={headingId}>
      <Container width="wide">
        <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={90} className="mt-lg">
              <Display id={headingId} measure={18}>
                {title}
              </Display>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {items.map((item, i) => (
              <Reveal
                key={item.question}
                as="details"
                delay={Math.min(i, 3) * 90}
                className="group border-t border-rule last:border-b"
              >
                <summary
                  className={
                    "flex cursor-pointer list-none items-baseline gap-lg py-lg " +
                    "font-serif text-lg font-light leading-snug text-fg-strong " +
                    "transition-opacity duration-300 hover:opacity-70 " +
                    "[&::-webkit-details-marker]:hidden"
                  }
                >
                  <span className="flex-1 text-pretty">{item.question}</span>

                  {/* A cross that loses its upright stroke when the panel opens. */}
                  <span
                    aria-hidden="true"
                    className="relative mt-2 block h-3 w-3 shrink-0"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                    <span
                      className={
                        "absolute left-1/2 top-0 h-3 w-px bg-current " +
                        "transition-transform duration-400 ease-in-out-quart " +
                        "group-open:scale-y-0 motion-reduce:transition-none"
                      }
                    />
                  </span>
                </summary>

                <div className="flex flex-col gap-md pb-lg">
                  {item.answer.map((paragraph, j) => (
                    <p
                      key={j}
                      className="max-w-[62ch] font-sans text-base leading-relaxed text-pretty text-fg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
