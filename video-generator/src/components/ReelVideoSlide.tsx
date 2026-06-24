import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { getTheme } from "../theme";

interface ReelVideoSlideProps {
  industry: string;
  videoSrc: string;
  headline?: string;
  subline?: string;
  durationInFrames: number;
}

export const ReelVideoSlide: React.FC<ReelVideoSlideProps> = ({
  industry,
  videoSrc,
  headline,
  subline,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTheme(industry);

  const accentHex = theme.pipelineLine1 || "#38bdf8";
  const accentRgb = theme.primaryGlow || "14, 165, 233";

  // Text animations
  const textEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const sublineEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Exit opacity
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Inter, sans-serif" }}>
      {/* Background Video */}
      <AbsoluteFill style={{ opacity: exitOpacity }}>
        {videoSrc.startsWith("http") ? (
          <OffthreadVideo src={videoSrc} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        ) : (
          <OffthreadVideo src={staticFile(videoSrc)} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        )}
      </AbsoluteFill>

      {/* Dark overlay for text readability */}
      <AbsoluteFill style={{ backgroundColor: "rgba(2, 6, 23, 0.5)", opacity: exitOpacity }} />

      {/* Text Overlay */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px",
        gap: "24px",
        opacity: exitOpacity,
      }}>
        {headline && (
          <h2 style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
            transform: `translateY(${(1 - textEntrance) * 40}px)`,
            opacity: textEntrance,
            textShadow: "0px 4px 20px rgba(0,0,0,0.6)",
          }}>
            {headline}
          </h2>
        )}
        
        {subline && (
          <div style={{
            transform: `translateY(${(1 - sublineEntrance) * 30}px)`,
            opacity: sublineEntrance,
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}>
            <div style={{ width: "40px", height: "4px", backgroundColor: accentHex, borderRadius: "2px" }} />
            <p style={{
              fontSize: "40px",
              fontWeight: 600,
              color: accentHex,
              textAlign: "center",
              margin: 0,
              lineHeight: 1.3,
              textShadow: "0px 2px 10px rgba(0,0,0,0.8)",
            }}>
              {subline}
            </p>
            <div style={{ width: "40px", height: "4px", backgroundColor: accentHex, borderRadius: "2px" }} />
          </div>
        )}
      </AbsoluteFill>
      
      {/* Bottom gradient for transition */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(2,6,23,1) 0%, transparent 15%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
