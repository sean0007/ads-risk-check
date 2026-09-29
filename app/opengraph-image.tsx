import { ImageResponse } from "next/og";

export const alt = "Ads Risk Check — plain-language ads notice risk card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#07080c",
          color: "#f3efe4",
          padding: "64px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#f0b429",
          }}
        >
          Free educational scorecard
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 980 }}>
            Ads Risk Check
          </div>
          <div style={{ fontSize: 28, color: "#9b9588", maxWidth: 900, lineHeight: 1.35 }}>
            Paste a Google Ads or Meta Ads notice. Get a HIGH / MED / LOW risk card + checklist.
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 22, color: "#9b9588" }}>
          <span style={{ color: "#fda4af" }}>HIGH</span>
          <span style={{ color: "#f0b429" }}>MED</span>
          <span style={{ color: "#99f6e4" }}>LOW</span>
          <span>Not legal advice · We don’t appeal accounts</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
