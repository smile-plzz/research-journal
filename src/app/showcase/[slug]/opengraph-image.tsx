import { ImageResponse } from "next/og";
import { getAllProjects, getProjectBySlug } from "@/lib/showcase/queries";
import { getCategoryMeta, PROJECT_STATUS_META } from "@/lib/showcase/schema";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ShowcaseOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const name = project?.name || siteConfig.name;
  const tagline =
    project?.tagline ||
    project?.description?.slice(0, 140) ||
    "Software project showcase";
  const category = project ? getCategoryMeta(project.category).label : "Showcase";
  const status = project ? PROJECT_STATUS_META[project.status].label : "";

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
          <span>{[category, status].filter(Boolean).join(" · ")}</span>
          <span style={{ color: "#62615D", fontWeight: 400 }}>{siteConfig.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "26px",
              fontFamily: "sans-serif",
              color: "#62615D",
              lineHeight: 1.4,
              maxWidth: "960px",
            }}
          >
            {tagline}
          </div>
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
          <span>{siteConfig.author.name}</span>
          <span>Project Showcase</span>
        </div>
      </div>
    ),
    size
  );
}
