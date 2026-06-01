import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
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
    { start: 0, end: 30, text: "¿CUÁNTO TIEMPO", isHighlight: false },
    { start: 30, end: 55, text: "PIERDES", isHighlight: true },
    { start: 55, end: 85, text: "POR DESPIDO?", isHighlight: false },
    { start: 85, end: 120, text: "ASÍ LO RESOLVEMOS.", isHighlight: true },
  ];

  const activePhraseObj = KINETIC_PHRASES.find(p => frame >= p.start && frame < p.end) || KINETIC_PHRASES[KINETIC_PHRASES.length - 1];
  const activePhraseText = activePhraseObj.text;
  const isHighlight = activePhraseObj.isHighlight;
  const activeStartFrame = activePhraseObj.start;

  const wordScale = spring({
    frame: frame - activeStartFrame,
    fps,
    config: { damping: 8, stiffness: 160 },
    from: 1.35,
    to: 1.0,
  });

  const angles = { 0: -3, 30: 4, 55: -2, 85: 3 };
  const activeAngle = angles[activeStartFrame as keyof typeof angles] || 0;

  const flashOpacity = interpolate(
    frame - activeStartFrame,
    [0, 5],
    [0.15, 0],
    { extrapolateRight: "clamp" }
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
        <div
          style={{
            backgroundColor: industry === "abogados" ? `rgba(${theme.primaryGlow}, 0.1)` : "rgba(239, 68, 68, 0.1)",
            border: industry === "abogados" ? `1px solid rgba(${theme.primaryGlow}, 0.3)` : "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "32px",
            padding: "24px",
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: industry === "abogados" ? `0 10px 30px rgba(${theme.primaryGlow}, 0.15)` : "0 10px 30px rgba(239, 68, 68, 0.15)",
          }}
        >
          {industry === "abogados" ? (
            <Scale size={64} color={`rgb(${theme.primaryGlow})`} />
          ) : (
            <MessageSquareOff size={64} color="#ef4444" />
          )}
        </div>

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
          <h1
            style={{
              fontSize: "90px",
              fontWeight: 950,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: "1000px",
              textAlign: "center",
              transform: `scale(${wordScale}) rotate(${activeAngle}deg)`,
              color: isHighlight ? `rgb(${theme.primaryGlow})` : "#ffffff",
              textShadow: isHighlight ? `0 0 45px rgba(${theme.primaryGlow}, 0.65)` : "none",
              letterSpacing: "-3px",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {activePhraseText}
          </h1>
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

      {/* Screen flash light overlay exactly on kinetic word pops */}
      {isAbogados && (
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#ffffff",
          opacity: flashOpacity,
          pointerEvents: "none",
          zIndex: 100,
        }} />
      )}
    </AbsoluteFill>
  );
};
