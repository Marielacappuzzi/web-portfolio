import Image from "next/image";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Pending } from "@/components/primitives/Pending";
import { Reveal } from "@/components/primitives/Reveal";
import type { Work, WorkKind, WorkStatus } from "@/content/types";

const kindLabels: Record<WorkKind, string> = {
  personal: "Obra personal",
  commission: "Obra por encargo",
  print: "Print",
};

const statusLabels: Record<WorkStatus, string> = {
  available: "Disponible",
  "private-collection": "Colección privada",
  "sold-out": "Agotado",
};

interface WorkSheetProps {
  work: Work;
  /** Crop for the plate. The drawings are portrait; this frame is not. */
  aspect?: string;
}

/**
 * The work and its label, side by side.
 *
 * Left, the piece at the width of two thirds of the page; right, the sentence
 * Mariela wrote about it, the specification, and the one action. It replaces a
 * tall portrait plate alone on its screen with the sheet a long way below it —
 * the two things a reader wants together were a scroll apart.
 *
 * The specification carries field names here, which the gallery deliberately
 * does not. In a grid, labels beside ten works are noise; on the piece's own
 * page they are what the reader came to check, and a row of "Técnica" against
 * its value is faster to read than four unlabelled lines.
 *
 * Only what exists is rendered. El Rescate is unfinished and has no year,
 * technique or dimensions, so its sheet shows what it has and then says the
 * rest is pending rather than filling the rows with something plausible.
 */
export function WorkSheet({ work, aspect = "aspect-[3/2]" }: WorkSheetProps) {
  const rows: [string, string][] = [];

  if (work.technique) rows.push(["Técnica", work.technique]);
  if (work.year) rows.push(["Año", String(work.year)]);
  if (work.dimensions) rows.push(["Dimensiones", work.dimensions]);

  const category = [
    work.kind ? kindLabels[work.kind] : undefined,
    work.status ? statusLabels[work.status] : undefined,
  ]
    .filter(Boolean)
    .join(" · ");
  if (category) rows.push(["Categoría", category]);

  return (
    <div className="grid gap-2xl lg:grid-cols-12 lg:items-start lg:gap-x-[4vw]">
      {work.image ? (
        <Reveal variant="image" className="lg:col-span-7">
          {/*
            A landscape frame over a portrait drawing, which is a crop and a
            deliberate one: this plate is the piece seen across the page, and
            the composition entire is in the row below. `coverFocus` is what
            each work already declares to keep its gaze inside a band.
          */}
          <div className={`relative w-full overflow-hidden ${aspect}`}>
            <Image
              src={work.image.src}
              alt={work.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 92vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: work.coverFocus ?? "50% 30%" }}
            />
          </div>
        </Reveal>
      ) : null}

      <div className="lg:col-span-4 lg:col-start-9">
        {work.shortStory ? (
          <Reveal>
            <p className="max-w-[42ch] font-serif text-lg font-light leading-snug text-pretty text-fg-strong">
              {work.shortStory}
            </p>
          </Reveal>
        ) : null}

        {rows.length > 0 ? (
          <Reveal delay={120} className="mt-xl">
            <dl className="flex flex-col">
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-3xs border-t border-rule py-md last:border-b sm:flex-row sm:items-baseline sm:gap-md"
                >
                  <dt className="font-sans text-2xs uppercase tracking-label text-fg-muted sm:w-[9rem] sm:shrink-0">
                    {label}
                  </dt>
                  <dd className="font-sans text-sm leading-relaxed text-pretty text-fg">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}

        {rows.length < 3 ? (
          <Reveal delay={150} className="mt-md">
            <Pending kind="data" detail="Año, técnica y medidas" />
          </Reveal>
        ) : null}

        {work.note ? (
          <Reveal delay={180} className="mt-md">
            <p className="max-w-[42ch] font-sans text-xs leading-relaxed text-fg-muted">
              {work.note}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={210} className="mt-xl">
          <ActionButton href="/contacto">Consultar obra</ActionButton>
        </Reveal>
      </div>
    </div>
  );
}
