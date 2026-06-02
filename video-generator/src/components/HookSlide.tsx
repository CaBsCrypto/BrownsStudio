import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { MessageSquareOff, Scale } from "lucide-react";
import { getTheme } from "../theme";

// ─── Typewriter helpers (from Remotion best practices skill) ─────────────────
const CHAR_FRAMES = 2; // frames per character — adjust for faster/slower typing
const CURSOR_BLINK_FRAMES = 18;

const getTypedText = (frame: number, fullText: string): string => {
  const charsVisible = Math.min(
    fullText.length,
    Math.floor(frame / CHAR_FRAMES)
  );
  return fullText.slice(0, charsVisible);
};

const Cursor: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(
    frame % CURSOR_BLINK_FRAMES,
    [0, CURSOR_BLINK_FRAMES / 2, CURSOR_BLINK_FRAMES],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <span
      style={{
        opacity,
        color: "#00f0ff",
        fontWeight: 300,
        marginLeft: 2,
      }}
    >
      ▍
    </span>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

export const HookSlide: React.FC<{ 
  hookText: string; 
  industry: string;
  durationInFrames: number;
}> = ({
  hookText,
  industry,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTheme(industry);

  // --- ENTRANCE: icon + tag fade in with crisp UI ease-out curve
  const entranceProgress = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // --- KINETIC TYPOGRAPHY (abogados pro)
  const isAbogados = industry === "abogados";
  const KINETIC_PHRASES = [
    { start: 0, end: 12, text: "¿TU", isHighlight: false },
    { start: 12, end: 28, text: "EQUIPO", isHighlight: false },
    { start: 28, end: 50, text: "DE ABOGADOS", isHighlight: true },
    { start: 50, end: 70, text: "PIERDE", isHighlight: true },
    { start: 70, end: 120, text: "HORAS?", isHighlight: true },
  ];

  const activePhraseObj = KINETIC_PHRASES.find(p => frame >= p.start && frame < p.end) || KINETIC_PHRASES[KINETIC_PHRASES.length - 1];
  const activePhraseText = activePhraseObj.text;
  const isHighlight = activePhraseObj.isHighlight;
  const activeStartFrame = activePhraseObj.start;

  const wordScale = spring({
    frame: frame - activeStartFrame,
    fps,
    config: { damping: 18, mass: 1.0 },
    from: 0.9,
    to: 1.0,
  });

  const angles = { 0: 0, 15: 0, 35: 0, 60: 0, 75: 0 };
  const activeAngle = angles[activeStartFrame as keyof typeof angles] || 0;



  const redGlowPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [10, 40]
  );

  // --- TYPEWRITER: starts immediately at frame 0, 2 frames per char
  const typewriterFrame = frame;
  const typedText = getTypedText(typewriterFrame, hookText);
  const typingDone = typedText.length >= hookText.length;

  // --- SUB-LABEL: fades in only after typing is complete
  const typingFinishFrame = hookText.length * CHAR_FRAMES;
  const subLabelOpacity = interpolate(
    frame,
    [typingFinishFrame, typingFinishFrame + 20],
    [0, 1],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // --- PULSING GLOW: driven by interpolate, no CSS transition
  const glowScale = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.92, 1.08]
  );

  // --- CAMERA DRIFT: Slow continuous zoom over the entire duration
  // Zooms IN, but finishes exactly at 1.0 so text never clips out of bounds
  const cameraDrift = interpolate(frame, [0, durationInFrames], [0.94, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Industry label
  const industryLabel =
    industry === "dental"
      ? "Clínicas & Salud"
      : industry === "abogados"
      ? "Estudios Jurídicos & Abogados"
      : industry === "inmobiliaria"
      ? "Inmobiliaria & Real Estate"
      : industry === "academia"
      ? "Educación & Academias"
      : industry === "ecommerce"
      ? "E-Commerce & Retail"
      : "Negocios & Servicios";

  const fullHookText = `${hookText} Cada mensaje sin respuesta es una oportunidad perdida. Así lo resolvemos con IA.`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080e2e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px",
        boxSizing: "border-box",
        fontFamily: "Outfit, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ─── LUXURY OFFICE BACKGROUND ─── */}
      <Img
        src={staticFile("office_bg.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.18, // Subtle cinematic backdrop
          pointerEvents: "none",
        }}
      />

      {/* ─── CAMERA CONTAINER ─── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${cameraDrift})`,
        transformOrigin: "center center",
      }}>
        {/* Primary Cyan Ambient Glow — pulsing, interpolate-driven */}
      <div
        style={{
          position: "absolute",
          width: "1000px",
          height: "1000px",
          borderRadius: "50%",
          background:
            `radial-gradient(circle, rgba(${theme.primaryGlow}, 0.28) 0%, rgba(${theme.secondaryGlow}, 0.12) 45%, rgba(0,0,0,0) 70%)`,
          transform: `scale(${glowScale})`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary Purple Glow — offset bottom right for depth */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            `radial-gradient(circle, rgba(${theme.secondaryGlow}, 0.22) 0%, rgba(${theme.primaryGlow}, 0.08) 50%, rgba(0,0,0,0) 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            `radial-gradient(rgba(${theme.primaryGlow}, 0.08) 1.5px, transparent 0)`,
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          opacity: entranceProgress,
          transform: `scale(${interpolate(entranceProgress, [0, 1], [0.92, 1])})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Floating icon */}
        {industry === "abogados" ? (
          <Img 
            src={staticFile("scale_icon.png")} 
            style={{ 
              width: 160, 
              height: 160, 
              objectFit: "cover",
              marginBottom: "40px",
              borderRadius: "32px",
              boxShadow: `0 0 ${redGlowPulse}px rgba(212, 175, 55, 0.4)`
            }} 
          />
        ) : (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "32px",
              padding: "24px",
              marginBottom: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.15)",
            }}
          >
            <MessageSquareOff size={64} color="#ef4444" />
          </div>
        )}

        {/* Industry Tag */}
        <div
          style={{
            textTransform: "uppercase",
            fontSize: "18px",
            fontWeight: 800,
            letterSpacing: "4px",
            color: `rgb(${theme.primaryGlow})`,
            marginBottom: "28px",
            backgroundColor: `rgba(${theme.primaryGlow}, 0.08)`,
            padding: "8px 20px",
            borderRadius: "20px",
            border: `1px solid rgba(${theme.primaryGlow}, 0.2)`,
          }}
        >
          {industryLabel}
        </div>

        {/* Hook Headline — KINETIC or TYPEWRITER */}
        {isAbogados ? (
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <h1
              style={{
                fontSize: "60px",
                fontWeight: 500,
                lineHeight: 1.2,
                margin: 0,
                maxWidth: "1000px",
                textAlign: "center",
                transform: `scale(${wordScale})`,
                color: isHighlight ? "#D4AF37" : "#E2E8F0",
                textShadow: isHighlight ? "0 0 20px rgba(212, 175, 55, 0.2)" : "0 2px 10px rgba(0,0,0,0.3)",
                letterSpacing: "-0.5px",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {activePhraseText}
            </h1>
            
            {/* Silent tag: "Y tu DINERO" */}
            {activePhraseText === "HORAS?" && frame >= 85 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  marginTop: "20px",
                  transform: `scale(${spring({
                    frame: frame - 85,
                    fps,
                    config: { damping: 12, mass: 0.8 },
                  })})`,
                  color: "#F8FAFC",
                  fontSize: "44px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                  textShadow: "0 0 30px rgba(212, 175, 55, 0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                ...Y TU DINERO
              </div>
            )}
          </div>
        ) : (
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.25,
              margin: 0,
              maxWidth: "900px",
              background: theme.textGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px",
              minHeight: "1.25em", // prevent layout shift as text grows
            }}
          >
            <span style={{ WebkitTextFillColor: "transparent" }}>
              {typedText}
            </span>
            {/* Blinking cursor — hides when typing is done */}
            {!typingDone && <Cursor frame={typewriterFrame} />}
          </h1>
        )}

        {/* Sub-label — appears after typing finishes (only for non-abogados) */}
        {!isAbogados && (
          <p
            style={{
              opacity: subLabelOpacity,
              color: "#8b9ab5",
              fontSize: "26px",
              marginTop: "30px",
              maxWidth: "620px",
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            Cada mensaje sin respuesta es una oportunidad perdida. Así lo resolvemos con IA →
          </p>
        )}
      </div>
      </div>

    </AbsoluteFill>
  );
};
