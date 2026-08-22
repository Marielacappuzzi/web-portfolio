import type { MetadataRoute } from "next";
import { getEditorialWorks } from "@/lib/content";

/**
 * PENDING: the production domain is not decided, so URLs are relative to
 * NEXT_PUBLIC_SITE_URL and fall back to localhost in development.
 * See docs/CONTENT_PENDING.md #22.
 */
const base =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getEditorialWorks();

  const pages = ["", "/obra", "/sobre-mi", "/encargos", "/contacto"];

  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...works.map((work) => ({
      url: `${base}/obra/${work.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
