import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { getTheme } from "../theme";

interface ReelCtaSlideProps {
  industry: string;
  ctaUrl: string;
  ctaHeadline?: string;
}

/**
 * Scene 3 of the Reel format — CTA Slide.
 *
 * Sequence:
 *   - Browns Studio logo animates in
 *   - Headline slides up
 *   - CTA URL pulses with glow
 *   - Animated arrow pointing down ("Link en bio")
 */
export const ReelCtaSlide: React.FC<ReelCtaSlideProps> = ({
  industry,
  ctaUrl,
  ctaHeadline = "Automatiza tu negocio con IA",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTheme(industry);

  const accentRgb = theme.primaryGlow;
  const accentHex = theme.pipelineLine1;

  // ── Entrance animations ──────────────────────────────────────────────────

  const logoEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, mass: 0.7 },
  });

  const headlineEntrance = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const urlEntrance = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, mass: 0.7 },
  });

  const arrowEntrance = spring({
    frame: frame - 85,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Pulsing glow on the URL button
  const glowPulse = 0.3 + Math.abs(Math.sin(frame * 0.07)) * 0.4;

  // Arrow bounce (continuous up-down)
  const arrowBounce =
    Math.sin(frame * 0.15) * 12 * Math.min(1, (frame - 85) / 30);

  // Background slow zoom
  const bgScale = interpolate(frame, [0, 240], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── Radial glow background ── */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 100%, rgba(${accentRgb}, 0.18) 0%, transparent 65%)`,
          transform: `scale(${bgScale})`,
        }}
      />

      {/* ── Subtle grid ── */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(${accentRgb}, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${accentRgb}, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Top horizontal accent line ── */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "10%",
          right: "10%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)`,
          opacity: 0.35,
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
        }}
      >
        {/* Browns Studio wordmark */}
        <div
          style={{
            transform: `scale(${logoEntrance}) translateY(${(1 - logoEntrance) * -30}px)`,
            opacity: logoEntrance,
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            Browns
          </span>
          <span
            style={{
              fontSize: "52px",
              fontWeight: 300,
              color: accentHex,
              marginLeft: "12px",
              letterSpacing: "-1px",
            }}
          >
            Studio
          </span>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#64748b",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "8px",
            }}
          >
            Inteligencia Artificial · WhatsApp
          </div>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#f1f5f9",
            textAlign: "center",
            lineHeight: 1.15,
            margin: "0 0 70px 0",
            maxWidth: "900px",
            transform: `translateY(${(1 - headlineEntrance) * 50}px)`,
            opacity: headlineEntrance,
          }}
        >
          {ctaHeadline}
        </h2>

        {/* CTA URL Button */}
        <div
          style={{
            transform: `scale(${urlEntrance})`,
            opacity: urlEntrance,
            position: "relative",
            marginBottom: "60px",
          }}
        >
          {/* Glow halo around the button */}
          <div
            style={{
              position: "absolute",
              inset: "-16px",
              borderRadius: "80px",
              background: `rgba(${accentRgb}, ${glowPulse * 0.3})`,
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "36px 72px",
              borderRadius: "100px",
              position: "relative",
              boxShadow: `0 0 60px rgba(${accentRgb}, ${glowPulse * 0.5}), 0 20px 60px rgba(0,0,0,0.4)`,
            }}
          >
            <span
              style={{
                fontSize: "58px",
                fontWeight: 800,
                color: "#020617",
                letterSpacing: "-1px",
              }}
            >
              {ctaUrl}
            </span>
          </div>
        </div>

        {/* Animated arrow + "Link en bio" */}
        <div
          style={{
            transform: `translateY(${(1 - arrowEntrance) * 40 + arrowBounce}px)`,
            opacity: arrowEntrance,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: accentHex,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Link en bio
          </span>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentHex}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </AbsoluteFill>

      {/* ── Bottom gradient ── */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.8) 0%, transparent 15%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
