import Link from "next/link";
import { ArrowRightIcon } from "@/components/primitives/Icon";
import { Badge } from "@/components/primitives/Badge";
import { Reveal } from "@/components/primitives/Reveal";
import { ArtworkFrame } from "./ArtworkFrame";
import type { Work } from "@/content/types";
import { cn } from "@/lib/cn";

interface FeaturedRowProps {
  works: Work[];
  className?: string;
}

/**
 * The three pieces that carry a story, as one editorial block.
 *
 * They share a row and a proportion so they read as a set rather than as the
 * first three items of a longer list — which is exactly what went wrong when
 * they sat interleaved with the catalogue. Each one says where it leads: the
 * card was clickable but silent about it, so a piece with a page of its own
 * looked no different from one without.
 *
 * The availability badge is a signal, not an offer. Sueño de Primavera is the
 * only work with an edition for sale, and the brief keeps every commercial
 * detail — price, stock, the ask — on that work's own page. Here it says one
 * word and links there.
 */
export function FeaturedRow({ works, className }: FeaturedRowProps) {
  if (works.length === 0) return null;

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-3xl md:grid-cols-3 md:gap-x-[3vw]",
        className,
      )}
    >
      {works.map((work, i) => (
        <li key={work.slug} className="group flex">
          <Link href={`/obra/${work.slug}`} className="flex w-full flex-col">
            <Reveal variant="image" delay={i * 120}>
              <ArtworkFrame
                work={work}
                aspect="aspect-[4/5]"
                focus={work.coverFocus ?? "50% 30%"}
                sizes="(min-width: 768px) 30vw, 100vw"
                zoomOnHover
              />
            </Reveal>

            <Reveal delay={i * 120 + 120} className="mt-md">
              <div className="flex flex-wrap items-center gap-2xs">
                {work.concept ? <Badge>{work.concept}</Badge> : null}

                {work.printAvailable ? (
                  <Badge>Edición disponible</Badge>
                ) : null}
              </div>

              <p className="mt-xs font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
                {work.title}
              </p>

              {/*
                A span, not a link: it sits inside the card's own anchor, and
                nesting one link inside another is invalid.
              */}
              <span
                className={cn(
                  "mt-md inline-flex items-center gap-2xs py-2xs",
                  "font-sans text-2xs font-medium uppercase tracking-label",
                  "border-b border-fg-muted text-fg-strong",
                  "transition-colors duration-300 group-hover:border-fg-strong",
                )}
              >
                {work.featuredLinkLabel ?? "Ver la obra"}
                <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
              </span>
            </Reveal>
          </Link>
        </li>
      ))}
    </ul>
  );
}
