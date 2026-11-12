import { getAllWorks } from "@/lib/catalog/queries";
import { getAllProjects } from "@/lib/showcase/queries";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = siteConfig.url;

  const combined = [
    ...getAllWorks().map((w) => ({
      title: w.title,
      link: `${siteUrl}/works/${w.slug}`,
      description: w.abstract,
      category: `Research / ${w.domainId}`,
      date: w.publishedAt || w.lastPushedAt,
    })),
    ...getAllProjects()
      .filter((p) => p.curated)
      .map((p) => ({
        title: p.name,
        link: `${siteUrl}/showcase/${p.slug}`,
        description: p.tagline || p.description || p.name,
        category: `Showcase / ${p.category}`,
        date: p.updatedAt,
      })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = combined
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <category><![CDATA[${item.category}]]></category>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} (All Updates)</title>
    <link>${siteUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed-all.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=14400",
    },
  });
}
