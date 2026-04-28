import { MetadataRoute } from "next";
import { BLOG_POSTS } from "./lib/blog";
import { RUNDOWNS } from "./lib/rundowns";

const BASE = "https://kyn.news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/explore`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/subscribe`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/catchup`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url:              `${BASE}/blog/${post.slug}`,
    lastModified:     new Date(),
    changeFrequency:  "monthly" as const,
    priority:         post.featured ? 0.8 : 0.6,
  }));

  const rundownRoutes: MetadataRoute.Sitemap = RUNDOWNS.map((run) => ({
    url:             `${BASE}/explore/rundowns/${run.slug}`,
    lastModified:    new Date(),
    changeFrequency: "never" as const,
    priority:        0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...rundownRoutes];
}
