import { getAllWorks } from "@/lib/catalog/queries";
import { siteConfig } from "@/config/site";

export async function GET() {
  const works = getAllWorks();
  const siteUrl = siteConfig.url;

  const rssItems = works
    .map((w) => {
      const pubDate = w.publishedAt
        ? new Date(w.publishedAt).toUTCString()
        : new Date(w.lastPushedAt).toUTCString();
      const link = `${siteUrl}/works/${w.slug}`;
      const authors = w.authors.map((a) => a.name).join(", ");

      return `
    <item>
      <title><![CDATA[${w.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${w.abstract}]]></description>
      <author><![CDATA[${authors}]]></author>
      <category><![CDATA[${w.domainId}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
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
