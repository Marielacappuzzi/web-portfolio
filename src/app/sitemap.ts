import type { MetadataRoute } from "next";
import { getEditorialWorks } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getEditorialWorks();

  /*
   * The legal pages were missing. They are linked from every footer and from
   * the consent checkbox on both forms, so leaving them out of the sitemap
   * told crawlers they were less real than they are.
   */
  const pages = [
    "",
    "/obra",
    "/sobre-mi",
    "/encargos",
    "/contacto",
    "/privacidad",
    "/terminos",
  ];

  /* Real pages, but not ones anybody searches for. */
  const legal = new Set(["/privacidad", "/terminos"]);

  return [
    ...pages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : legal.has(path) ? 0.3 : 0.8,
    })),
    ...works.map((work) => ({
      url: `${siteUrl}/obra/${work.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
