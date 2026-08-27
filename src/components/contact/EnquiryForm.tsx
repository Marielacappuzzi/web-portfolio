"use client";

import Link from "next/link";

import { type FormEvent, useState } from "react";
import { ContactSent } from "./ContactSent";
import { Pending } from "@/components/primitives/Pending";
import { PhoneField } from "./PhoneField";
import type { FormField } from "@/content/types";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha-client";
import { CheckIcon } from "@/components/primitives/Icon";
import { cn } from "@/lib/cn";

/*
 * Public by design — it identifies the site to Google and is visible in the
 * page source either way. The secret key never leaves the server.
 */
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

type Status =
  | "idle"
  | "consent"
  | "sending"
  | "sent"
  | "invalid"
  | "not-configured"
  | "failed";

interface EnquiryFormProps {
  /** "consulta" or "cotizacion". Tells the server which field list applies. */
  form: "consulta" | "cotizacion";
  fields: FormField[];
  submitLabel: string;
  confirmation: string;
  confirmationNote: string;
  /** Distinguishes the two forms' element ids on a page that had both. */
  idPrefix?: string;
}

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

/**
 * The one form on the site, wearing two hats.
 *
 * /contacto asks four questions; /encargos asks seven, including the format and
 * the kind of commission. They used to be two components with the same body,
 * and before that they were nearly the same form under two different titles —
 * which is the thing this split exists to prevent. The fields come from the
 * content layer, `form` says which list the server should validate against, and
 * everything else is identical because it should be.
 */
export function EnquiryForm({
  form,
  fields,
  submitLabel,
  confirmation,
  confirmationNote,
  idPrefix = "campo",
}: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);

  const busy = status === "sending";
  const consentId = `${idPrefix}-privacidad`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));

    if (!consent) {
      setStatus("consent");
      return;
    }

    const empty = fields
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
        body: JSON.stringify({ ...data, formulario: form, recaptchaToken }),
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
    return <ContactSent message={confirmation} note={confirmationNote} />;
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
        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            idPrefix={idPrefix}
            invalid={missing.includes(field.name)}
            disabled={busy}
          />
        ))}
      </div>

      {/* Honeypot. Invisible, off the tab order, ignored by people. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${idPrefix}-empresa`}>Empresa</label>
        <input
          id={`${idPrefix}-empresa`}
          name="empresa"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/*
        Consent to the privacy policy, unticked by default and required before
        anything is sent. It covers this one enquiry: there is no newsletter
        and no marketing to opt into, so bundling a second purpose in here
        would make the tick meaningless.
      */}
      <div className="flex items-start gap-sm">
        {/*
          The tick sits over the box rather than inside it: a styled checkbox
          has no glyph of its own, so checked only filled the square. The mark
          is what says yes — a fill alone reads as a state, not an answer.
        */}
        <span className="relative mt-1 block h-4 w-4 shrink-0">
          <input
            id={consentId}
            name="privacidad"
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (event.target.checked && status === "consent") setStatus("idle");
            }}
            disabled={busy}
            aria-invalid={status === "consent" || undefined}
            className={cn(
              "absolute inset-0 h-full w-full cursor-pointer appearance-none border border-rule bg-bg",
              "transition-colors duration-200 hover:border-fg-muted",
              "checked:border-fg-strong checked:bg-fg-strong",
              "focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current",
              "aria-[invalid=true]:border-fg-strong",
            )}
          />
          <CheckIcon
            aria-hidden="true"
            width={12}
            height={12}
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "text-bg transition-opacity duration-200",
              consent ? "opacity-100" : "opacity-0",
            )}
          />
        </span>
        <label
          htmlFor={consentId}
          className="max-w-[62ch] cursor-pointer font-sans text-sm leading-relaxed text-fg"
        >
          He leído y acepto la{" "}
          <Link
            href="/privacidad"
            className="text-fg-strong underline decoration-rule decoration-1 underline-offset-[4px] transition-colors duration-300 hover:decoration-current"
          >
            Política de Privacidad
          </Link>{" "}
          y el tratamiento de mis datos para gestionar mi consulta.
        </label>
      </div>

      <div className="flex flex-col gap-lg">
        <button
          type="submit"
          disabled={busy}
          className={cn(
            "action-frame self-start px-lg py-sm",
            "font-sans text-2xs font-medium uppercase tracking-label",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          <span className="relative z-10">{busy ? "Enviando…" : submitLabel}</span>
        </button>

        <div aria-live="polite" className="min-h-6">
          {status === "consent" ? (
            <p className="font-sans text-sm text-fg-strong">
              Para enviar necesitamos que aceptes la Política de Privacidad.
            </p>
          ) : null}

          {status === "invalid" ? (
            <p className="font-sans text-sm text-fg-strong">
              {missing.length === 1
                ? "Falta un campo por completar, marcado más arriba."
                : `Faltan ${missing.length} campos por completar, marcados más arriba.`}
            </p>
          ) : null}

          {status === "failed" ? (
            <p className="max-w-[52ch] font-sans text-sm text-fg-strong">
              No pudimos enviar tu mensaje. Vuelve a intentarlo en un momento.
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

      {/* Set apart under a rule: this is Google's wording, not Mariela's. */}
      {siteKey ? (
        <div className="mt-md border-t border-rule pt-md">
          {/*
            Google requires this wherever the floating badge is hidden, and the
            badge is hidden because a fixed widget in the corner is exactly the
            kind of interface furniture this site does without. The text is the
            alternative Google itself documents.
          */}
          <p className="font-sans text-xs leading-relaxed text-fg-muted">
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
        </div>
      ) : null}
    </form>
  );
}

/* ---------------------------------------------------------------------- */

function Field({
  field,
  idPrefix,
  invalid,
  disabled,
}: {
  field: FormField;
  idPrefix: string;
  invalid: boolean;
  disabled: boolean;
}) {
  const id = `${idPrefix}-${field.name}`;
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
          <span className="normal-case tracking-normal text-fg-muted">
            · opcional
          </span>
        ) : null}
      </label>

      {/*
        Muted, not faint: faint measures 3.8:1 against the paper ground and
        this is the line that tells someone what to write.
      */}
      {field.hint ? (
        <span id={hintId} className="font-sans text-sm text-fg-muted">
          {field.hint}
        </span>
      ) : null}

      {field.kind === "textarea" ? (
        <textarea {...shared} rows={6} className={cn(fieldBase, "resize-y")} />
      ) : field.kind === "select" ? (
        <select {...shared} defaultValue="" className={cn(fieldBase, "pr-10")}>
          {/* Tuteo, matching the register of the rest of the site. */}
          <option value="" disabled>
            Selecciona una opción
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.kind === "tel" ? (
        <PhoneField
          id={id}
          name={field.name}
          describedBy={hintId}
          disabled={disabled}
          className={fieldBase}
        />
      ) : (
        <input {...shared} type={field.kind} className={fieldBase} />
      )}
    </div>
  );
}
