import Link from "next/link";
import { ArrowRightIcon } from "@/components/primitives/Icon";
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
 * Nothing commercial here at all. Sueño de Primavera is the only work with an
 * edition for sale, and every detail of it — availability included — belongs
 * on that work's own page rather than as a badge in a row of three.
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
              {/*
                Name and one link. The "Edición disponible" badge is gone with
                the concept label before it: availability is a commercial fact,
                and every commercial fact about the edition now lives on Sueño
                de Primavera's own page. A row of three works where one carries
                a badge also reads as one of them being on offer.
              */}
              <p className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
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
                {/*
                  The same three words on all three. Each piece used to carry
                  its own label — "Descubrir la historia", "Descubrir la obra",
                  "Conocer la obra" — which was an editorial flourish and read
                  as an inconsistency: three buttons side by side, doing the
                  same thing, saying it differently. A row of controls should
                  vary when the action varies, and here it does not.
                */}
                Ver la obra
                <ArrowRightIcon className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
              </span>
            </Reveal>
          </Link>
        </li>
      ))}
    </ul>
  );
}
