import { NextResponse } from "next/server";
import { getCommissionsPage, getContactPage } from "@/lib/content";
import type { FormField } from "@/content/types";
import { sendContact, validate } from "@/lib/contact";
import { verifyRecaptcha } from "@/lib/recaptcha";

/**
 * POST /api/contacto
 *
 * Validates on the server — the browser checks are a courtesy, not a control —
 * and hands the message to Resend.
 *
 * The honeypot is the whole anti-spam strategy. A field that is invisible and
 * off the tab order is never filled by a person, and bots fill everything.
 * It costs the visitor nothing, which a CAPTCHA cannot say, and this site is
 * meant to feel like the beginning of a conversation rather than a checkpoint.
 * A silent 200 is returned to bots so they learn nothing.
 *
 * When the admin panel arrives, the Supabase insert goes right before the
 * send: a stored enquiry survives a mail provider having a bad day.
 */
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

  /*
    Which form posted, and therefore which fields are legal. The endpoint used
    to look this up from /contacto whatever had arrived, so a quotation was
    validated against a form it does not share and "Formato deseado" — which
    exists only on the quote — never reached the email. It never failed; the
    request simply arrived without the size the person had chosen.
  */
  const form: { fields: FormField[]; kindLabel: string } =
    payload.formulario === "cotizacion"
      ? await getCommissionsPage().then((commissions) => commissions.quote)
      : await getContactPage();

  const { values, missing } = validate(payload, form.fields);

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, reason: "invalid", missing },
      { status: 422 },
    );
  }

  const result = await sendContact(values, form.fields, form.kindLabel);

  if (!result.ok) {
    return NextResponse.json(result, {
      status: result.reason === "not-configured" ? 503 : 502,
    });
  }

  return NextResponse.json({ ok: true });
}
