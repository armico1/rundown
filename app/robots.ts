import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/settings"],
      },
    ],
    sitemap: "https://kyn.news/sitemap.xml",
    host: "https://kyn.news",
  };
}
