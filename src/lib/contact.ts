import type { FormField } from "@/content/types";

/**
 * Contact submission: validation and delivery.
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

export interface ContactSubmission {
  nombre: string;
  correo: string;
  telefono?: string;
  lugar?: string;
  motivo: string;
  mensaje: string;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; missing: string[] }
  | { ok: false; reason: "not-configured" }
  | { ok: false; reason: "send-failed" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Runs on the server too. Client validation is convenience, not a control. */
export function validate(
  data: Record<string, unknown>,
  fields: FormField[],
): { values: ContactSubmission; missing: string[] } {
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

  return {
    values: {
      nombre: read("nombre"),
      correo: read("correo"),
      telefono: read("telefono") || undefined,
      lugar: read("lugar") || undefined,
      motivo: read("motivo"),
      mensaje: read("mensaje"),
    },
    missing,
  };
}

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function buildBody(values: ContactSubmission): string {
  const rows: [string, string | undefined][] = [
    ["Nombre", values.nombre],
    ["Correo", values.correo],
    ["Teléfono", values.telefono],
    ["País o ciudad", values.lugar],
    ["Motivo", values.motivo],
  ];

  const meta = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#7c7c78;font:13px system-ui">${label}</td><td style="padding:4px 0;color:#111110;font:13px system-ui">${escape(value as string)}</td></tr>`,
    )
    .join("");

  return `<div style="max-width:600px;font:15px/1.6 system-ui;color:#111110">
<p style="margin:0 0 24px;color:#7c7c78;font-size:13px">Consulta desde marielacrapuzzi.com</p>
<table style="border-collapse:collapse;margin-bottom:24px">${meta}</table>
<div style="border-top:1px solid #ddddd8;padding-top:20px;white-space:pre-wrap">${escape(values.mensaje)}</div>
</div>`;
}

export async function sendContact(
  values: ContactSubmission,
): Promise<ContactResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  // Nothing is configured yet. Say so rather than reporting a false success —
  // an enquiry that silently vanishes is worse than one that never sent.
  if (!key || !from || !to) return { ok: false, reason: "not-configured" };

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
        subject: `${values.motivo} — ${values.nombre}`,
        html: buildBody(values),
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
