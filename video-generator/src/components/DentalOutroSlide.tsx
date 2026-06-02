import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LightLeak } from "@remotion/light-leaks";

export const DentalOutroSlide: React.FC<{ ctaUrl?: string }> = ({ ctaUrl = "browns.studio/dental" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const zeroPercentEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const hundredPercentEntrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const ctaEntrance = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Background slow zoom
  const bgScale = interpolate(frame, [0, 300], [1, 1.1], {
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      {/* Dynamic Grid Background */}
      <AbsoluteFill style={{ 
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.15) 0%, transparent 60%)",
        transform: `scale(${bgScale})`
      }} />

      <AbsoluteFill>
        <LightLeak />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "80px", gap: "60px" }}>
        
        {/* Value Proposition Cards */}
        <div style={{ display: "flex", gap: "40px", width: "100%", justifyContent: "center" }}>
          {/* Card 1: 0% No shows */}
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            borderRadius: "30px",
            padding: "50px",
            border: "1px solid rgba(0, 210, 255, 0.3)",
            transform: `scale(${zeroPercentEntrance})`,
            opacity: zeroPercentEntrance,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h2 style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: "120px",
              color: "#00d2ff",
              margin: 0,
              textShadow: "0 0 40px rgba(0, 210, 255, 0.5)"
            }}>
              24/7
            </h2>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "35px",
              color: "#ffffff",
              margin: "10px 0 0 0"
            }}>
              Atención
            </p>
          </div>

          {/* Card 2: 100% Atendidos */}
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            borderRadius: "30px",
            padding: "50px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transform: `scale(${hundredPercentEntrance})`,
            opacity: hundredPercentEntrance,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h2 style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: "120px",
              color: "#ffffff",
              margin: 0
            }}>
              100%
            </h2>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "35px",
              color: "#94a3b8",
              margin: "10px 0 0 0"
            }}>
              Automatizada
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{
          transform: `translateY(${(1 - ctaEntrance) * 50}px)`,
          opacity: ctaEntrance,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "bounce 2s infinite"
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              color: "#00d2ff",
              marginTop: "10px",
              textTransform: "uppercase",
              letterSpacing: "2px"
            }}>
              Link en el perfil
            </span>
          </div>

          <div style={{
            backgroundColor: "#ffffff",
            padding: "30px 60px",
            borderRadius: "60px",
            marginTop: "30px",
            boxShadow: "0 20px 50px rgba(0, 210, 255, 0.3)"
          }}>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "50px",
              color: "#020617"
            }}>
              {ctaUrl}
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Global CSS for animations */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
      `}</style>
    </AbsoluteFill>
  );
};
