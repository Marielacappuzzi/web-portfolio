import type { MetadataRoute } from "next";
import { getEditorialWorks } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getEditorialWorks();

  const pages = ["", "/obra", "/sobre-mi", "/encargos"];

  return [
    ...pages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...works.map((work) => ({
      url: `${siteUrl}/obra/${work.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
