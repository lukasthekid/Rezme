import type { MetadataRoute } from "next";

const SITE_URL = "https://rezme.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-03-30"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-03-30"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified: new Date("2026-03-30"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
