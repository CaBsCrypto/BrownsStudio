import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/config";

export const runtime = "edge";
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #040a16 0%, #0a1428 50%, #040a16 100%)",
          color: "#e5e5e5",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,240,255,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(147,158,181,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top row — logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontSize: "44px",
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            BROWNS{" "}
            <span
              style={{
                marginLeft: "10px",
                background: "linear-gradient(135deg, #c6c6c7, #939eb5)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              STUDIO
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(0,240,255,0.35)",
              color: "#00f0ff",
              fontSize: "20px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "rgba(0,240,255,0.06)",
            }}
          >
            AI · Web · Bots · LATAM
          </div>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#e5e5e5",
              display: "flex",
              maxWidth: "1000px",
            }}
          >
            Diseño Web Premium + IA para tu negocio
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#9a9a9a",
              display: "flex",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Webs que convierten, bots que trabajan 24/7 y training en IA para tu equipo.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", color: "#00f0ff", fontSize: "24px", letterSpacing: "0.08em" }}>
            browns.studio
          </div>
          <div style={{ display: "flex", color: "#5a5a5a", fontSize: "20px" }}>
            7× Google AI Certified
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
