import { NextResponse } from "next/server";
import { getCommissionsPage, getContactPage } from "@/lib/content";
import { sendContact, validate } from "@/lib/contact";
import { verifyRecaptcha } from "@/lib/recaptcha";
import type { FormField } from "@/content/types";

/**
 * POST /api/contacto — both forms.
 *
 * Two forms reach this route: the general enquiry on /contacto and the quote
 * request on /encargos. `formulario` in the payload says which, and the server
 * looks up that form's own field list from the content layer. The field list is
 * the allow-list: validation and the email are both built from it, so a caller
 * cannot smuggle in a field the form never had, and adding one to a form
 * requires no change here.
 *
 * Validates on the server — the browser checks are a courtesy, not a control.
 *
 * The honeypot is the first line of the anti-spam strategy. A field that is
 * invisible and off the tab order is never filled by a person, and bots fill
 * everything. A silent 200 is returned to them so they learn nothing.
 *
 * When the admin panel arrives, the Supabase insert goes right before the
 * send: a stored enquiry survives a mail provider having a bad day.
 */

/** Which form sent this, and the fields it is allowed to carry. */
async function formFor(
  which: unknown,
): Promise<{ fields: FormField[]; kind: string }> {
  if (which === "cotizacion") {
    const page = await getCommissionsPage();
    return { fields: page.quote.fields, kind: page.quote.kind };
  }

  const page = await getContactPage();
  return { fields: page.fields, kind: "Consulta general" };
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  if (String(payload.empresa ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  /*
   * reCAPTCHA v3 scores the visit rather than challenging anyone. It runs
   * after the honeypot — that one is free and catches the cheap bots — and
   * only a confident rejection stops the request. A missing key, a missing
   * token or a failed call all let the enquiry through: a commission lost to
   * a blocked script is worse than a piece of spam in a filtered inbox.
   */
  const recaptcha = await verifyRecaptcha(
    typeof payload.recaptchaToken === "string" ? payload.recaptchaToken : undefined,
    "contacto",
  );

  if (!recaptcha.ok) {
    // Nothing useful to a bot, nothing alarming to the rare person caught by
    // a low score — the form simply reports it could not send.
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 429 });
  }

  const { fields, kind } = await formFor(payload.formulario);
  const { values, missing } = validate(payload, fields);

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, reason: "invalid", missing },
      { status: 422 },
    );
  }

  const result = await sendContact(values, fields, kind);

  if (!result.ok) {
    return NextResponse.json(result, {
      status: result.reason === "not-configured" ? 503 : 502,
    });
  }

  return NextResponse.json({ ok: true });
}
