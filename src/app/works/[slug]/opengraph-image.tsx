import { ImageResponse } from "next/og";
import { getAllWorks, getWorkBySlug } from "@/lib/catalog/queries";
import { getDomainById } from "@/config/domains";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllWorks().map((w) => ({ slug: w.slug }));
}

export default async function WorkOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  const domain = work ? getDomainById(work.domainId) : undefined;

  const title = work?.title || siteConfig.name;
  const meta = [domain?.shortName, work?.status].filter(Boolean).join(" · ") || "Research";
  const authorLine = work?.authors.map((a) => a.name).join(", ") || siteConfig.author.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#FAF9F7",
          color: "#1F1E1D",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            fontFamily: "sans-serif",
            color: "#9A3F2E",
            fontWeight: 600,
          }}
        >
          <span>{meta}</span>
          <span style={{ color: "#62615D", fontWeight: 400 }}>{siteConfig.name}</span>
        </div>

        <div
          style={{
            fontSize: title.length > 72 ? "44px" : "54px",
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            fontFamily: "sans-serif",
            color: "#62615D",
            borderTop: "1px solid rgba(31, 30, 29, 0.12)",
            paddingTop: "24px",
          }}
        >
          <span>{authorLine}</span>
          {work?.readingTimeMinutes ? (
            <span>{work.readingTimeMinutes} min read</span>
          ) : (
            <span>Research Archive</span>
          )}
        </div>
      </div>
    ),
    size
  );
}
