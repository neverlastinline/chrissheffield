import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteConfig.url}/`,            lastModified: now, priority: 1 },
    { url: `${siteConfig.url}/login`,       lastModified: now, priority: 0.5 },
    { url: `${siteConfig.url}/signup`,      lastModified: now, priority: 0.5 },
    { url: `${siteConfig.url}/leaderboard`, lastModified: now, priority: 0.6 },
  ];
}
