"use client";

import { type FormEvent, useState } from "react";
import { ContactSent } from "./ContactSent";
import { Pending } from "@/components/primitives/Pending";
import type { ContactPage, FormField } from "@/content/types";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha-client";
import { cn } from "@/lib/cn";

/*
 * Public by design — it identifies the site to Google and is visible in the
 * page source either way. The secret key never leaves the server.
 */
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

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
 * the person filling it in. The border reads a shade darker than a decorative
 * rule — a hairline is ornament, but the edge of a field is what tells you
 * where to type — and thickens to the text colour on focus.
 */
const fieldBase = cn(
  "w-full border border-field bg-bg px-4 py-3",
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

    /*
      Ask Google to score the visit. `undefined` when reCAPTCHA is not
      configured or could not load, which the server treats as "not proven,
      not refused" — a blocked script must not cost Mariela an enquiry.
    */
    const recaptchaToken = siteKey
      ? await getRecaptchaToken(siteKey, "contacto")
      : undefined;

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
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
    <form
      onSubmit={handleSubmit}
      noValidate
      /*
        Fetch the script the first time someone touches a field rather than on
        page load: most visitors never write, and they should not pay ~80KB
        and a third-party connection for a form they do not use. By the time
        anyone finishes typing it is ready.
      */
      onFocus={siteKey ? () => void loadRecaptcha(siteKey) : undefined}
      className="flex flex-col gap-xl"
    >
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

      {/*
        Google requires this wherever the floating badge is hidden, and the
        badge is hidden because a fixed widget in the corner is exactly the
        kind of interface furniture this site does without. The text is the
        alternative Google itself documents.
      */}
      {siteKey ? (
        <p className="font-sans text-xs leading-relaxed text-fg-faint">
          Este sitio está protegido por reCAPTCHA y se aplican la{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-rule underline-offset-4 transition-colors duration-300 hover:text-fg"
          >
            Política de privacidad
          </a>{" "}
          y los{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-rule underline-offset-4 transition-colors duration-300 hover:text-fg"
          >
            Términos del servicio
          </a>{" "}
          de Google.
        </p>
      ) : null}
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
