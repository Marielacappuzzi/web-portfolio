import type { Work, WorkKind, WorkStatus } from "@/content/types";
import { cn } from "@/lib/cn";

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
  const yearLine = [work.attribution, work.year].filter(Boolean).join(" · ");

  return (
    <div className={cn("flex flex-col", className)}>
      <p className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
        {work.title}
      </p>

      {yearLine ? (
        <p className="mt-2xs font-sans text-sm leading-normal text-fg-muted">
          {yearLine}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Availability alone, for the gallery card.
 *
 * The one piece of the technical sheet that belongs on a card. Someone
 * scanning a wall of ten drawings is asking which of them they could have;
 * making them open all ten to learn that eight are in private collections is
 * the kind of small cruelty a gallery should not commit.
 *
 * Set at `text-sm` in the muted tone, not `2xs` in the faint one — legible is
 * not the same as loud, and the previous scale was neither.
 */
export function WorkAvailability({ work, className }: PartProps) {
  const line = [
    work.kind ? kindLabels[work.kind] : undefined,
    work.status ? statusLabels[work.status] : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  if (!line) return null;

  return (
    <p
      className={cn(
        "font-sans text-sm leading-normal text-fg-muted",
        className,
      )}
    >
      {line}
    </p>
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
        <p className="mt-md max-w-[56ch] font-sans text-sm leading-relaxed text-fg-muted">
          {work.note}
        </p>
      ) : null}
    </div>
  );
}
