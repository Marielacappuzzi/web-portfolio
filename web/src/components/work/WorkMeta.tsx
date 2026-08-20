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

interface WorkMetaProps {
  work: Work;
  /** `full` adds the closing note and the support line. */
  detail?: "card" | "full";
  className?: string;
}

/**
 * The technical sheet.
 *
 * Follows the display criterion in the technical sheet document exactly:
 * title first, the year immediately under it, and then technique, dimensions
 * and status in a quieter hierarchy. No field labels — "Año", "Técnica",
 * "Dimensiones" are never printed, so it reads like a gallery catalogue rather
 * than a form. Every line is conditional; what was not provided is omitted.
 */
export function WorkMeta({ work, detail = "card", className }: WorkMetaProps) {
  const yearLine = [work.attribution, work.year].filter(Boolean).join(" · ");

  const statusLine = [
    work.kind ? kindLabels[work.kind] : undefined,
    work.status ? statusLabels[work.status] : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={cn("flex flex-col", className)}>
      <p className="font-serif text-xl font-light leading-tight tracking-tight text-fg-strong">
        {work.title}
      </p>

      {yearLine ? (
        <p className="mt-3xs font-sans text-xs text-fg-faint">{yearLine}</p>
      ) : null}

      {(work.technique || work.dimensions || statusLine) && (
        <div className="mt-2xs flex flex-col font-sans text-xs leading-snug text-fg-muted">
          {work.technique ? <span>{work.technique}</span> : null}
          {detail === "full" && work.support ? (
            <span>{work.support}</span>
          ) : null}
          {work.dimensions ? <span>{work.dimensions}</span> : null}
          {statusLine ? <span>{statusLine}</span> : null}
        </div>
      )}

      {detail === "full" && work.note ? (
        <p className="mt-md max-w-[52ch] font-sans text-xs leading-relaxed text-fg-faint">
          {work.note}
        </p>
      ) : null}
    </div>
  );
}
