/**
 * Loading reCAPTCHA v3 in the browser.
 *
 * The script is fetched on first use rather than on page load. Only a fraction
 * of visitors write to Mariela, and the rest should not pay ~80KB and a
 * third-party connection for a form they never touch. It is requested when
 * someone first focuses a field, so by the time they finish typing it is ready
 * and asking for a token costs nothing.
 *
 * Every failure path resolves rather than throws. If Google is blocked — a
 * privacy extension, a corporate network, a country that cannot reach it — the
 * form must still send. The server treats a missing token as "not proven, not
 * refused" for the same reason.
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SCRIPT_ID = "recaptcha-v3";

let loading: Promise<boolean> | null = null;

/** Injects the script once. Resolves false if it cannot be loaded. */
export function loadRecaptcha(siteKey: string): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (loading) return loading;

  loading = new Promise<boolean>((resolve) => {
    if (window.grecaptcha) {
      resolve(true);
      return;
    }

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(true), { once: true });
    script.addEventListener("error", () => resolve(false), { once: true });
    document.head.appendChild(script);
  });

  return loading;
}

/**
 * Asks Google for a token. Returns undefined when reCAPTCHA is unavailable —
 * the caller sends anyway and the server decides.
 */
export async function getRecaptchaToken(
  siteKey: string,
  action: string,
): Promise<string | undefined> {
  const ready = await loadRecaptcha(siteKey);
  if (!ready || !window.grecaptcha) return undefined;

  try {
    return await new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(siteKey, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  } catch {
    return undefined;
  }
}
