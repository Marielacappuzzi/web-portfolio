import type { Work, WorkKind, WorkStatus } from "@/content/types";
import { cn } from "@/lib/cn";

const kindLabels: Record<WorkKind, string> = {
  personal: "Obra personal",
  commission: "Obra por encargo",
  print: "Print",
};

const statusLabels: Record<WorkStatus, string> = {
  "in-progress": "En proceso",
  available: "Disponible",
  sold: "Vendida",
  "private-collection": "Colección privada",
  "sold-out": "Agotada",
};

/**
 * Work information, split in two so it can be ordered correctly.
 *
 * Mariela's hierarchy is fixed:
 *
 *     image → title → year → curatorial text → technical sheet
 *
 * The sheet accompanies the piece; it never precedes the writing and never
 * competes with the title. Keeping identity and specs as separate components
 * is what lets the curatorial line sit between them.
 */

interface PartProps {
  work: Work;
  className?: string;
}

/** Title, then the year immediately under it. Nothing else. */
export function WorkIdentity({ work, className }: PartProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <p className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
        {work.title}
      </p>

      {/*
        Its own line, directly under the name, before the year.

        It used to be joined to the year with a middot — "after Bouguereau,
        Rêve de printemps (1901) · 2022" — which files the source under
        metadata alongside a date. Mariela's instruction is that the
        attribution is indivisible from the title, and a line of its own under
        it is what says so. Serif and italic to match how the name is set,
        rather than the sans the specification uses.
      */}
      {work.attribution ? (
        <p className="mt-3xs font-serif text-base font-light italic leading-snug text-pretty text-fg">
          {work.attribution}
        </p>
      ) : null}

      {work.year ? (
        <p className="mt-2xs font-sans text-sm leading-normal text-fg-muted">
          {work.year}
        </p>
      ) : null}
    </div>
  );
}

interface SpecsProps extends PartProps {
  /** `full` adds the support line and the closing note. */
  detail?: "card" | "full";
}

/**
 * Technique, dimensions and status.
 *
 * No field labels — never "Año", "Técnica", "Dimensiones" — so it reads like a
 * gallery caption rather than a form. Set at `text-sm` with real leading and
 * each value on its own row: it was too small and too faint to read
 * comfortably, and legibility is not the same thing as prominence.
 */
export function WorkSpecs({ work, detail = "card", className }: SpecsProps) {
  const statusLine = [
    work.kind ? kindLabels[work.kind] : undefined,
    work.status ? statusLabels[work.status] : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  const lines = [
    work.technique,
    detail === "full" ? work.support : undefined,
    work.dimensions,
    statusLine || undefined,
  ].filter(Boolean);

  if (lines.length === 0 && !(detail === "full" && work.note)) return null;

  return (
    <div className={cn("flex flex-col", className)}>
      {lines.length > 0 ? (
        <div className="flex flex-col gap-3xs font-sans text-sm leading-relaxed text-fg-muted">
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      ) : null}

      {detail === "full" && work.note ? (
        <p className="mt-md max-w-[56ch] font-sans text-sm leading-relaxed text-fg-faint">
          {work.note}
        </p>
      ) : null}
    </div>
  );
}
