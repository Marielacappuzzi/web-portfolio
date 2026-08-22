import { cn } from "@/lib/cn";

type PendingKind = "asset" | "data" | "confirm";

const labels: Record<PendingKind, string> = {
  asset: "Imagen pendiente",
  data: "Dato pendiente",
  confirm: "Pendiente de confirmar",
};

interface PendingProps {
  kind?: PendingKind;
  /** Optional detail, e.g. the name of the work whose photograph is missing. */
  detail?: string;
  className?: string;
}

/**
 * A declared gap.
 *
 * The brief is explicit: when definitive information is missing, mark it
 * clearly rather than invent it. This renders that marker as part of the
 * design language — quiet, in the label style — so a pending item reads as a
 * decision instead of an oversight.
 *
 * Every occurrence is tracked in docs/CONTENT_PENDING.md.
 */
export function Pending({ kind = "data", detail, className }: PendingProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2xs font-sans text-2xs uppercase tracking-label text-fg-faint",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-4 bg-current" />
      {labels[kind]}
      {detail ? <span className="normal-case tracking-normal">· {detail}</span> : null}
    </span>
  );
}
