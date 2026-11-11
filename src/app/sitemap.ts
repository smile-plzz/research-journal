import { MetadataRoute } from "next";
import { getAllWorks } from "@/lib/catalog/queries";
import { getAllProjects } from "@/lib/showcase/queries";
import { PROJECT_CATEGORIES } from "@/lib/showcase/schema";
import { researchDomains } from "@/config/domains";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const works = getAllWorks();
  const projects = getAllProjects();
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research-areas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const domainRoutes: MetadataRoute.Sitemap = researchDomains.map((d) => ({
    url: `${baseUrl}/research-areas/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const workRoutes: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${baseUrl}/works/${w.slug}`,
    lastModified: new Date(w.lastPushedAt),
    changeFrequency: "monthly",
    priority: w.featured ? 0.9 : 0.7,
  }));

  const showcaseCategoryRoutes: MetadataRoute.Sitemap = PROJECT_CATEGORIES.map((c) => ({
    url: `${baseUrl}/showcase/categories/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const showcaseProjectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/showcase/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: p.featured ? 0.9 : p.curated ? 0.8 : 0.5,
  }));

  return [
    ...staticRoutes,
    ...domainRoutes,
    ...workRoutes,
    ...showcaseCategoryRoutes,
    ...showcaseProjectRoutes,
  ];
}
