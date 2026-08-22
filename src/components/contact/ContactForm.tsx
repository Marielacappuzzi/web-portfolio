"use client";

import { type FormEvent, useState } from "react";
import { ContactSent } from "./ContactSent";
import { Pending } from "@/components/primitives/Pending";
import type { ContactPage, FormField } from "@/content/types";
import { cn } from "@/lib/cn";

type Status =
  | "idle"
  | "sending"
  | "sent"
  | "invalid"
  | "not-configured"
  | "failed";

/**
 * Bordered fields, not underlines.
 *
 * An underline reads as one more hairline on a page already made of them; a
 * bordered box reads unmistakably as "type here", which is what a form owes
 * the person filling it in. The border still uses the ground's own rule colour
 * and thickens to the text colour on focus, so the field belongs to the same
 * system without becoming an interface widget.
 */
const fieldBase = cn(
  "w-full border border-rule bg-bg px-4 py-3",
  "font-sans text-base text-fg-strong placeholder:text-fg-faint",
  "transition-colors duration-200",
  "hover:border-fg-muted",
  "focus:border-fg-strong focus:outline-none",
  "aria-[invalid=true]:border-fg-strong aria-[invalid=true]:bg-fg-strong/4.5",
  "disabled:opacity-60",
);

export function ContactForm({ page }: { page: ContactPage }) {
  const [status, setStatus] = useState<Status>("idle");
  const [missing, setMissing] = useState<string[]>([]);

  const busy = status === "sending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const empty = page.fields
      .filter((field) => field.required)
      .filter((field) => !String(data[field.name] ?? "").trim())
      .map((field) => field.name);

    if (empty.length > 0) {
      setMissing(empty);
      setStatus("invalid");
      return;
    }

    setMissing([]);
    setStatus("sending");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("sent");
        return;
      }

      if (body.reason === "invalid") {
        setMissing(body.missing ?? []);
        setStatus("invalid");
        return;
      }

      setStatus(body.reason === "not-configured" ? "not-configured" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  // The confirmation replaces the form. Leaving the fields filled invites a
  // second send and makes the visitor wonder whether the first one worked.
  if (status === "sent") {
    return (
      <ContactSent message={page.confirmation} note={page.confirmationNote} />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-xl">
      <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
        {page.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            invalid={missing.includes(field.name)}
            disabled={busy}
          />
        ))}
      </div>

      {/* Honeypot. Invisible, off the tab order, ignored by people. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="campo-empresa">Empresa</label>
        <input id="campo-empresa" name="empresa" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-md">
        <button
          type="submit"
          disabled={busy}
          className={cn(
            "action-frame self-start px-lg py-sm",
            "font-sans text-2xs font-medium uppercase tracking-label",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          <span className="relative z-10">
            {busy ? "Enviando…" : page.submitLabel}
          </span>
        </button>

        <div aria-live="polite" className="min-h-6">
          {status === "invalid" ? (
            <p className="font-sans text-sm text-fg-strong">
              {missing.length === 1
                ? "Falta un campo por completar, marcado más arriba."
                : `Faltan ${missing.length} campos por completar, marcados más arriba.`}
            </p>
          ) : null}

          {status === "failed" ? (
            <p className="max-w-[52ch] font-sans text-sm text-fg-strong">
              No pudimos enviar tu mensaje. Vuelve a intentarlo en un momento
              o escríbeme directamente por correo.
            </p>
          ) : null}

          {status === "not-configured" ? (
            <div className="flex flex-col gap-2xs">
              <p className="font-sans text-sm text-fg">
                El formulario todavía no está conectado a un destino de envío.
              </p>
              <Pending kind="confirm" detail="RESEND_API_KEY, CONTACT_FROM, CONTACT_TO" />
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------------- */

function Field({
  field,
  invalid,
  disabled,
}: {
  field: FormField;
  invalid: boolean;
  disabled: boolean;
}) {
  const id = `campo-${field.name}`;
  const hintId = field.hint ? `${id}-ayuda` : undefined;
  const wide = field.kind === "textarea";

  const shared = {
    id,
    name: field.name,
    disabled,
    "aria-describedby": hintId,
    "aria-invalid": invalid || undefined,
  };

  return (
    <div className={cn("flex flex-col gap-2xs", wide && "sm:col-span-2")}>
      <label
        htmlFor={id}
        className="flex items-baseline gap-2xs font-sans text-2xs uppercase tracking-label text-fg-muted"
      >
        {field.label}
        {!field.required ? (
          <span className="normal-case tracking-normal text-fg-faint">
            · opcional
          </span>
        ) : null}
      </label>

      {field.hint && field.hint !== "Opcional" ? (
        <span id={hintId} className="font-sans text-sm text-fg-faint">
          {field.hint}
        </span>
      ) : null}

      {field.kind === "textarea" ? (
        <textarea {...shared} rows={6} className={cn(fieldBase, "resize-y")} />
      ) : field.kind === "select" ? (
        <select {...shared} defaultValue="" className={cn(fieldBase, "pr-10")}>
          {/* Tuteo, matching the register of docs/Copy.md. */}
          <option value="" disabled>
            Selecciona una opción
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...shared} type={field.kind} className={fieldBase} />
      )}
    </div>
  );
}
