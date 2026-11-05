import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ethan Stuart — Product Leadership & Building";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#edf3ee",
          color: "#14181F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#7C8493",
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            marginBottom: 34,
            fontFamily: "monospace",
          }}
        >
          Ethan Stuart · Product Leadership &amp; Building
        </div>
        <div
          style={{
            fontSize: 55,
            color: "#14181F",
            lineHeight: 1.14,
            letterSpacing: "-0.02em",
            maxWidth: 940,
          }}
        >
          I lead product strategy and teams at Disney.
        </div>
        <div
          style={{
            fontSize: 55,
            color: "#295e4d",
            lineHeight: 1.14,
            letterSpacing: "-0.02em",
            maxWidth: 940,
          }}
        >
          I’m also building Allison’s Kitchen.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 66,
            left: 88,
            right: 88,
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #DFDFDA",
            paddingTop: 22,
            fontSize: 19,
            color: "#7C8493",
            fontFamily: "monospace",
          }}
        >
          <span>Leadership, products, and life outside work</span>
          <span>ethancstuart.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
