import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ethan Stuart — Product & Technology Leader";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#3b82f6",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            marginBottom: 24,
            fontFamily: "monospace",
          }}
        >
          Product & Technology Leader
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Ethan Stuart
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Building clarity from ambiguity. Leading enterprise data, AI, and
          product strategy at Disney Studios Technology.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 18,
            color: "#525252",
            fontFamily: "monospace",
          }}
        >
          ethancstuart.com
        </div>
      </div>
    ),
    { ...size }
  );
}
