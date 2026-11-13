import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${siteConfig.legal.lastUpdated}T00:00:00Z`);
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/politica-de-privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/termos-e-condicoes`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
