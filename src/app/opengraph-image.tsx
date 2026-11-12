import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
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
            gap: "14px",
            fontSize: "24px",
            fontFamily: "sans-serif",
            color: "#9A3F2E",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              backgroundColor: "#9A3F2E",
            }}
          />
          <span>{siteConfig.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
            }}
          >
            Research monographs and everyday software tools.
          </div>
          <div
            style={{
              fontSize: "26px",
              fontFamily: "sans-serif",
              color: "#62615D",
              maxWidth: "860px",
              lineHeight: 1.4,
            }}
          >
            Scholarly publications, empirical studies, browser web apps, and desktop tools.
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
          <span>Jahangirnagar University · Dhaka</span>
        </div>
      </div>
    ),
    size
  );
}
