import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/data/portfolio";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return [
    { url: `${base}/` },
    ...caseStudies.map((c) => ({ url: `${base}/work/${c.slug}/` })),
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}/`, lastModified: p.date })),
  ];
}
