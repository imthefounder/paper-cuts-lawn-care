import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

export const alt = "Paper Cuts Lawn Care - lawn mowing and yard clean ups in Vandalia, Ohio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080b09",
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 18,
              background: "#84c02a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0d120e",
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: -1,
            }}
          >
            PC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 8,
                color: "#f5f3ea",
                textTransform: "uppercase",
              }}
            >
              Paper Cuts Lawn Care
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 17,
                letterSpacing: 4,
                color: "#84c02a",
                textTransform: "uppercase",
              }}
            >
              Vandalia, Ohio
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 118,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: -3,
              color: "#f5f3ea",
              textTransform: "uppercase",
            }}
          >
            Cut Above
          </div>
          <div
            style={{
              fontSize: 118,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: -3,
              color: "#a3dc46",
              textTransform: "uppercase",
            }}
          >
            The Rest
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              background: "#f2c518",
              color: "#0d120e",
              borderRadius: 14,
              padding: "16px 26px",
              fontSize: 26,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Free estimates - {SITE.phoneDisplay}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9ca39d" }}>
            Mowing - Trimming - Aeration - Clean ups
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
