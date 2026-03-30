import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/app/", "/api/"],
      },
    ],
    sitemap: "https://rezme.ai/sitemap.xml",
  };
}
