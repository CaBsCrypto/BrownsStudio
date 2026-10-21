import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV !== "production") return [];

  // The new public landing is the only canonical page in this release.
  return [{ url: "https://www.browns.studio/" }];
}
