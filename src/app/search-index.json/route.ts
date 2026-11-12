import { getAllWorks } from "@/lib/catalog/queries";
import { getAllProjects } from "@/lib/showcase/queries";
import { getDomainById } from "@/config/domains";
import { getCategoryMeta } from "@/lib/showcase/schema";

export const dynamic = "force-static";

export interface SearchIndexItem {
  id: string;
  wing: "research" | "showcase";
  slug: string;
  href: string;
  title: string;
  summary: string;
  meta: string;
  tags: string[];
  badge?: string;
}

export interface SearchIndexPayload {
  items: SearchIndexItem[];
}

export async function GET() {
  const works = getAllWorks();
  const projects = getAllProjects();

  const workItems: SearchIndexItem[] = works.map((w) => {
    const domain = getDomainById(w.domainId);
    return {
      id: `w:${w.slug}`,
      wing: "research",
      slug: w.slug,
      href: `/works/${w.slug}`,
      title: w.title,
      summary: w.abstract.slice(0, 140),
      meta: domain ? domain.shortName : w.status,
      tags: w.keywords.slice(0, 5),
      badge: w.status,
    };
  });

  const projectItems: SearchIndexItem[] = projects.map((p) => {
    const cat = getCategoryMeta(p.category);
    return {
      id: `p:${p.slug}`,
      wing: "showcase",
      slug: p.slug,
      href: `/showcase/${p.slug}`,
      title: p.name,
      summary: (p.tagline || p.description || "").slice(0, 140),
      meta: cat.shortLabel,
      tags: [...p.tech.slice(0, 3), ...p.platforms.slice(0, 2)],
      badge: p.liveUrl ? "Live" : p.downloads.length > 0 ? "Download" : undefined,
    };
  });

  const payload: SearchIndexPayload = {
    items: [...projectItems, ...workItems],
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
