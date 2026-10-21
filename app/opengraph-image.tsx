import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Browns Studio — Las personas ya buscan en la IA. ¿Encontrarán tu empresa?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 68px",
        color: "#162d42",
        background: "linear-gradient(135deg, #fbfcfd 0%, #edf3ff 65%, #dbe9ff 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "-0.04em" }}>
          Browns Studio
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "#526477" }}>
          Empresas de servicios en Chile
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 20, fontWeight: 600, color: "#2f5ce5" }}>
          Información preparada para las búsquedas con IA
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em" }}>
          <span>Las personas ya buscan en la IA.</span>
          <span>¿Encontrarán tu empresa?</span>
        </div>
        <div style={{ display: "flex", maxWidth: 950, fontSize: 25, lineHeight: 1.4, color: "#526477" }}>
          Analizamos tu presencia y mejoramos la información que los buscadores con IA pueden consultar.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #c5d7ef", paddingTop: 24 }}>
        <div style={{ display: "flex", padding: "16px 24px", borderRadius: 12, background: "#2f5ce5", color: "#fff", fontSize: 22, fontWeight: 600 }}>
          Pide tu análisis inicial gratis
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#526477" }}>browns.studio</div>
      </div>
    </div>,
    { ...size },
  );
}
