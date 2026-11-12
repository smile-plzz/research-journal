import { getAllProjects } from "@/lib/showcase/queries";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export async function GET() {
  const projects = getAllProjects().filter((p) => p.curated);
  const siteUrl = siteConfig.url;

  const rssItems = projects
    .map((p) => {
      const pubDate = new Date(p.updatedAt).toUTCString();
      const link = `${siteUrl}/showcase/${p.slug}`;
      const summary = p.tagline || p.description || p.name;

      return `
    <item>
      <title><![CDATA[${p.name}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${summary}]]></description>
      <category><![CDATA[${p.category}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} (Showcase)</title>
    <link>${siteUrl}/showcase</link>
    <description>Software projects, web apps, and desktop tools by ${siteConfig.author.name}.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/showcase/feed.xml" rel="self" type="application/rss+xml"/>
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
