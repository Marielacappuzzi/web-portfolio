/**
 * The absolute origin of the deployed site.
 *
 * One resolver, used by the layout's metadata, the sitemap and robots.txt.
 * It was duplicated in all three; they agreed by luck rather than by design,
 * and only one of them validated anything.
 *
 * Every candidate is trimmed and parsed before it is trusted. `??` alone is
 * not enough: it falls through on null and undefined but not on an empty
 * string, and an environment variable created in a dashboard without a value
 * arrives as `""`. That reached `new URL("")`, which throws — during page-data
 * collection, so the whole build failed rather than one route. A blank field
 * in a form should never be able to do that.
 *
 * Order: the explicit setting wins, then the host Vercel injects on every
 * deployment, then localhost so development works with nothing configured.
 */
function firstValidOrigin(...candidates: (string | undefined)[]): string {
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    // VERCEL_PROJECT_PRODUCTION_URL arrives as a bare host, with no scheme.
    const absolute = value.startsWith("http") ? value : `https://${value}`;

    try {
      // `.origin` also normalises away a trailing slash or a stray path.
      return new URL(absolute).origin;
    } catch {
      // Malformed value: try the next candidate rather than failing the build.
    }
  }

  return "http://localhost:3000";
}

export const siteUrl = firstValidOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
);
