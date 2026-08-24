// The secret key lives here. Importing this from a Client Component is a build
// error, which is the one mistake that would publish it.
import "server-only";

/**
 * reCAPTCHA v3 verification.
 *
 * v3 does not challenge anyone. The page asks Google for a token, Google scores
 * it 0.0–1.0 from how the visitor behaved, and the server decides. Nobody is
 * ever shown a grid of traffic lights, which matters on a page meant to read as
 * the beginning of a conversation rather than a checkpoint.
 *
 * It sits *behind* the honeypot rather than replacing it. The honeypot costs
 * nothing and catches the cheap bots; this catches the rest. Neither can be the
 * whole answer: a scored system will occasionally be wrong about a real person,
 * so the threshold matters — see below.
 */

/**
 * Minimum score to accept.
 *
 * Google's own default is 0.5. This sits lower on purpose: the cost of a false
 * positive here is a commission enquiry that silently never arrives, and
 * Mariela would never know it was sent. The cost of a false negative is one
 * piece of spam in a Gmail inbox that already filters spam. Those are not
 * remotely the same, so the threshold leans towards letting people through.
 */
const MINIMUM_SCORE = 0.3;

type VerifyResult =
  | { ok: true; score: number }
  | { ok: false; reason: "low-score"; score: number }
  | { ok: false; reason: "rejected" };

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

/**
 * Verifies a token with Google.
 *
 * Returns `ok` when reCAPTCHA is not configured at all: the form must keep
 * working while the keys are being set up, and an enquiry lost to a missing
 * environment variable is worse than one piece of spam.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction: string,
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Not configured — do not block the form.
  if (!secret) return { ok: true, score: 1 };

  // Configured but no token: the script failed to load, or the request did not
  // come from the form. Let it through rather than losing a real enquiry to a
  // blocked CDN; the honeypot and the server-side validation still apply.
  if (!token) return { ok: true, score: 1 };

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
        // Google being slow must not hold an enquiry hostage.
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) return { ok: true, score: 1 };

    const body = (await response.json()) as RecaptchaResponse;

    if (!body.success) {
      console.error("reCAPTCHA rejected the token", body["error-codes"]);
      return { ok: false, reason: "rejected" };
    }

    // A token minted for a different action is a token lifted from elsewhere.
    if (body.action && body.action !== expectedAction) {
      console.error("reCAPTCHA action mismatch", body.action);
      return { ok: false, reason: "rejected" };
    }

    const score = body.score ?? 0;

    if (score < MINIMUM_SCORE) {
      return { ok: false, reason: "low-score", score };
    }

    return { ok: true, score };
  } catch (error) {
    // Network failure, timeout, malformed response: none of these are the
    // visitor's fault, and none of them are evidence of a bot.
    console.error("reCAPTCHA verification failed", error);
    return { ok: true, score: 1 };
  }
}
