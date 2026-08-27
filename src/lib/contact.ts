// Importing this module from a Client Component is a build error. The Resend
// key lives here; a stray import would be the one mistake that leaks it.
import "server-only";

import type { FormField } from "@/content/types";

/**
 * Form submission: validation and delivery. Shared by both forms.
 *
 * There are two — a general enquiry on /contacto and a quote request on
 * /encargos — and they have different fields. Rather than two endpoints and two
 * validators, everything here is driven by the `FormField[]` the content layer
 * already defines: validation checks what that list says is required, and the
 * email is built from the same labels. Adding a field to a form is a content
 * change and nothing else.
 *
 * The delivery rule that matters: the email is sent **from a domain Mariela
 * controls**, never from the visitor's address. Forging the sender fails SPF
 * and DKIM, so the message lands in spam or is rejected outright. Instead the
 * visitor's address goes in `Reply-To` — Mariela opens the mail in Gmail, hits
 * Reply, and the answer goes straight to them. Same result, and it arrives.
 *
 * Resend is called over plain HTTP rather than through its SDK: one POST does
 * the whole job, and the project stays at zero runtime dependencies.
 */

/** Field name to submitted value. Shaped by the form, not by this module. */
export type Submission = Record<string, string>;

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; missing: string[] }
  | { ok: false; reason: "not-configured" }
  | { ok: false; reason: "send-failed" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Runs on the server too. Client validation is convenience, not a control.
 *
 * Only declared fields are read, so nothing a caller invents in the payload
 * reaches the email — the field list is the allow-list.
 */
export function validate(
  data: Record<string, unknown>,
  fields: FormField[],
): { values: Submission; missing: string[] } {
  const read = (name: string) => String(data[name] ?? "").trim();

  const missing = fields
    .filter((field) => field.required)
    .filter((field) => {
      const value = read(field.name);
      if (!value) return true;
      if (field.kind === "email") return !EMAIL.test(value);
      return false;
    })
    .map((field) => field.name);

  const values: Submission = {};
  for (const field of fields) values[field.name] = read(field.name);

  return { values, missing };
}

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * The email Mariela reads.
 *
 * Every field except the long one becomes a row; the long one closes the
 * message under a rule, because that is the part she actually reads. Which
 * field is which comes from `kind === "textarea"`, so the layout follows the
 * form definition rather than a hard-coded list of names.
 */
function buildBody(
  values: Submission,
  fields: FormField[],
  kind: string,
): string {
  const rows = fields
    .filter((field) => field.kind !== "textarea")
    .filter((field) => values[field.name])
    .map(
      (field) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#7c7c78;font:13px system-ui">${escape(field.label)}</td><td style="padding:4px 0;color:#111110;font:13px system-ui">${escape(values[field.name])}</td></tr>`,
    )
    .join("");

  const body = fields
    .filter((field) => field.kind === "textarea")
    .map((field) => values[field.name])
    .filter(Boolean)
    .map(escape)
    .join("<br><br>");

  return `<div style="max-width:600px;font:15px/1.6 system-ui;color:#111110">
<p style="margin:0 0 24px;color:#7c7c78;font-size:13px">${escape(kind)} — marielacrapuzzi.com</p>
<table style="border-collapse:collapse;margin-bottom:24px">${rows}</table>
<div style="border-top:1px solid #ddddd8;padding-top:20px;white-space:pre-wrap">${body}</div>
</div>`;
}

export async function sendContact(
  values: Submission,
  fields: FormField[],
  kind: string,
): Promise<ContactResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  // Nothing is configured yet. Say so rather than reporting a false success —
  // an enquiry that silently vanishes is worse than one that never sent.
  if (!key || !from || !to) return { ok: false, reason: "not-configured" };

  /*
    The subject has to be readable in a list of unread mail: what kind of
    message it is, and who sent it. A quote request must never look like a
    general enquiry in the inbox — they are answered differently.
  */
  const who = values.nombre || values.correo || "sin nombre";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.correo,
        subject: `${kind} — ${who}`,
        html: buildBody(values, fields, kind),
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the message", await response.text());
      return { ok: false, reason: "send-failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Contact delivery failed", error);
    return { ok: false, reason: "send-failed" };
  }
}
