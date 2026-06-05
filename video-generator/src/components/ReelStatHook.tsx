import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { getTheme } from "../theme";

interface ReelStatHookProps {
  industry: string;
  statNumber: string;
  statText: string;
  statSubline: string;
  durationInFrames: number;
}

/**
 * Scene 1 of the Reel format.
 * Displays a bold industry stat to stop the scroll immediately.
 *
 * Aesthetic: Minimalist premium — dark background, large typography,
 * subtle radial glow in the industry's accent color, particle dots.
 */
export const ReelStatHook: React.FC<ReelStatHookProps> = ({
  industry,
  statNumber,
  statText,
  statSubline,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTheme(industry);

  // ── Animations ────────────────────────────────────────────────────────────

  // 1. Big stat number crashes in from below
  const numberEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, mass: 0.6, stiffness: 120 },
  });

  // 2. Stat text line fades/slides up
  const textEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // 3. Sub-line (question / tension) fades in
  const sublineEntrance = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Subtle exit: everything fades out before transition
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Slow background zoom for cinematic feel
  const bgScale = interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow on the stat number (after entrance)
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.6, 1.0]
  );

  // Derive accent colour from the theme
  const accentRgb = theme.primaryGlow; // e.g. "14, 165, 233"
  const accentHex = theme.pipelineLine1; // e.g. "#38bdf8"

  // Generate subtle particle positions (deterministic from index)
  const particles = Array.from({ length: 18 }, (_, i) => ({
    x: ((i * 137.5) % 100),
    y: ((i * 97.3) % 100),
    size: 2 + (i % 3),
    opacity: 0.1 + (i % 4) * 0.06,
    delay: i * 3,
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── Animated background radial glow ── */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(${accentRgb}, 0.14) 0%, transparent 70%)`,
          transform: `scale(${bgScale})`,
        }}
      />

      {/* ── Subtle grid / noise overlay ── */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(${accentRgb}, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${accentRgb}, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.6,
        }}
      />

      {/* ── Decorative particles ── */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            backgroundColor: accentHex,
            opacity:
              p.opacity *
              interpolate(
                frame - p.delay,
                [0, 30, 60],
                [0, p.opacity, p.opacity],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
          }}
        />
      ))}

      {/* ── Horizontal accent line (top) ── */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "10%",
          right: "10%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)`,
          opacity: interpolate(frame, [20, 50], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* ── Main content ── */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 70px",
          gap: 0,
          opacity: exitOpacity,
        }}
      >
        {/* Browns Studio badge */}
        <div
          style={{
            backgroundColor: `rgba(${accentRgb}, 0.12)`,
            border: `1px solid rgba(${accentRgb}, 0.3)`,
            borderRadius: "100px",
            padding: "14px 36px",
            marginBottom: "60px",
            opacity: interpolate(frame, [10, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              color: accentHex,
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Browns Studio · IA para Negocios
          </span>
        </div>

        {/* ── Big Stat Number ── */}
        <div
          style={{
            transform: `translateY(${(1 - numberEntrance) * 120}px) scale(${0.7 + numberEntrance * 0.3})`,
            opacity: numberEntrance,
            marginBottom: "20px",
            position: "relative",
          }}
        >
          {/* Glow behind the number */}
          <div
            style={{
              position: "absolute",
              inset: "-40px",
              background: `radial-gradient(circle, rgba(${accentRgb}, ${glowPulse * 0.25}) 0%, transparent 70%)`,
              filter: "blur(30px)",
            }}
          />
          <span
            style={{
              fontSize: "260px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-8px",
              textShadow: `0 0 80px rgba(${accentRgb}, 0.5), 0 0 160px rgba(${accentRgb}, 0.2)`,
              display: "block",
              textAlign: "center",
            }}
          >
            {statNumber}
          </span>
        </div>

        {/* ── Stat text ── */}
        <p
          style={{
            fontSize: "52px",
            fontWeight: 500,
            color: "#cbd5e1",
            textAlign: "center",
            lineHeight: 1.3,
            margin: "0 0 50px 0",
            maxWidth: "860px",
            transform: `translateY(${(1 - textEntrance) * 40}px)`,
            opacity: textEntrance,
          }}
        >
          {statText}
        </p>

        {/* ── Sub-line / question ── */}
        <div
          style={{
            transform: `translateY(${(1 - sublineEntrance) * 30}px)`,
            opacity: sublineEntrance,
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: accentHex,
            }}
          />
          <p
            style={{
              fontSize: "44px",
              fontWeight: 700,
              color: accentHex,
              textAlign: "center",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {statSubline}
          </p>
          <div
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: accentHex,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* ── Bottom gradient for transition ── */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(2,6,23,0.9) 0%, transparent 20%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
