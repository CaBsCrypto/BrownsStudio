import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { getTheme as getIndustryTheme } from "../theme";

const getIndustryText = (industry: string) => {
  return industry === "dental" ? "tu clínica dental" :
         industry === "abogados" ? "tu firma legal" :
         industry === "inmobiliaria" ? "tu agencia inmobiliaria" : 
         "tu operación";
};

export const OutroSlide: React.FC<{ ctaUrl: string; industry?: string }> = ({ ctaUrl, industry = "default" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getIndustryTheme(industry);
  const industryText = getIndustryText(industry);
  const isAbogados = industry === "abogados";

  // --- CAMERA DRIFT: Slow continuous zoom-out
  const cameraDrift = interpolate(frame, [0, 120], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Animations springs
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const contentEntrance = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const buttonEntrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12 },
  });

  // Pulse effect on button glow
  const btnGlow = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [10, 25]
  );

  // Custom Legal ROI Metric Springs
  const card1Entrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const card2Entrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const brandingEntrance = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  if (isAbogados) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#050B14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 40px",
          boxSizing: "border-box",
          fontFamily: "Outfit, 'Montserrat', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background radial highlights */}
        <div
          style={{
            position: "absolute",
            width: "900px",
            height: "900px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${theme.secondaryGlow}, 0.15) 0%, rgba(${theme.primaryGlow}, 0.05) 45%, rgba(0,0,0,0) 70%)`,
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Global halo */}
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            border: `1.5px solid rgba(${theme.secondaryGlow}, 0.08)`,
            boxShadow: `0 0 60px rgba(${theme.secondaryGlow}, 0.03)`,
            transform: `scale(${cameraDrift})`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Outer Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
            transform: `scale(${cameraDrift})`,
          }}
        >
          {/* Main Title */}
          <h1
            style={{
              color: "white",
              fontSize: "64px",
              fontWeight: 950,
              textAlign: "center",
              lineHeight: 1.15,
              marginBottom: "60px",
              background: theme.textGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-2px",
            }}
          >
            El Futuro de tu<br />Estudio Empieza Hoy
          </h1>

          {/* Grid of Stat Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "36px",
              width: "100%",
              maxWidth: "600px",
              marginBottom: "80px",
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                transform: `scale(${card1Entrance})`,
                opacity: card1Entrance,
                backgroundColor: "rgba(10, 37, 64, 0.4)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "30px",
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2
                style={{
                  color: "#D4AF37",
                  fontSize: "90px",
                  fontWeight: 950,
                  margin: 0,
                  lineHeight: 1.0,
                  letterSpacing: "-2px",
                }}
              >
                -70%
              </h2>
              <p
                style={{
                  color: "#F8FAFC",
                  fontSize: "26px",
                  fontWeight: 600,
                  margin: "12px 0 0 0",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Tiempo en Soporte
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                transform: `scale(${card2Entrance})`,
                opacity: card2Entrance,
                backgroundColor: "rgba(10, 37, 64, 0.4)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "30px",
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2
                style={{
                  color: "#D4AF37",
                  fontSize: "90px",
                  fontWeight: 950,
                  margin: 0,
                  lineHeight: 1.0,
                  letterSpacing: "-2px",
                }}
              >
                100%
              </h2>
              <p
                style={{
                  color: "#F8FAFC",
                  fontSize: "26px",
                  fontWeight: 600,
                  margin: "12px 0 0 0",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Clientes Tranquilos e Informados
              </p>
            </div>
          </div>

          {/* Branding */}
          <div
            style={{
              transform: `scale(${brandingEntrance})`,
              opacity: brandingEntrance,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Soft firm logo badge */}
            <div
              style={{
                background: `linear-gradient(135deg, ${theme.pipelineLine1} 0%, ${theme.pipelineLine3} 100%)`,
                color: "#0A2540",
                fontSize: "26px",
                fontWeight: 900,
                padding: "16px 40px",
                borderRadius: "20px",
                letterSpacing: "2px",
                boxShadow: `0 10px 30px rgba(${theme.secondaryGlow}, 0.3)`,
                display: "inline-block",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textTransform: "uppercase",
              }}
            >
              García & Asociados
            </div>
            <p
              style={{
                color: "#64748b",
                fontSize: "18px",
                marginTop: "16px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Tecnología por Browns Studio
            </p>
          </div>
        </div>
      </AbsoluteFill>
    );
  }

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

      {/* Background radial highlights */}
      <div
        style={{
          position: "absolute",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${theme.primaryGlow}, 0.15) 0%, rgba(${theme.secondaryGlow}, 0.05) 45%, rgba(0,0,0,0) 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Outro Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Browns Studio Logo / Badge */}
        <div
          style={{
            transform: `scale(${logoEntrance})`,
            opacity: logoEntrance,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          {/* Logo Icon Sphere */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "32px",
              background: `linear-gradient(135deg, ${theme.pipelineLine1} 0%, ${theme.pipelineLine2} 100%)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: `0 15px 35px rgba(${theme.primaryGlow}, 0.25)`,
              color: "white",
              fontWeight: 900,
              fontSize: 36,
              letterSpacing: "-1.5px",
            }}
          >
            BS
          </div>
          <h2
            style={{
              color: "white",
              fontSize: "36px",
              fontWeight: 900,
              letterSpacing: "1px",
              marginTop: "20px",
              margin: "20px 0 0 0",
            }}
          >
            BROWNS STUDIO
          </h2>
          <span
            style={{
              color: theme.pipelineLine1,
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "8px",
            }}
          >
            Ingeniería de IA & Automatización
          </span>
        </div>

        {/* The Offer Card */}
        <div
          style={{
            transform: `scale(${contentEntrance})`,
            opacity: contentEntrance,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "36px",
            padding: "50px 60px",
            maxWidth: "800px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            marginBottom: "50px",
          }}
        >
          <h3
            style={{
              color: "white",
              fontSize: "36px",
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            ¿Quieres un Prototipo Gratis de tu IA Automatizada? 🚀
          </h3>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              marginTop: "24px",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Analizamos {industryText} y diseñamos una arquitectura de automatización junto a una demostración visual personalizada, sin costo y sin compromiso.
          </p>
        </div>

        {/* Dynamic CTA Button */}
        <div
          style={{
            transform: `scale(${buttonEntrance})`,
            opacity: buttonEntrance,
          }}
        >
          <div
            style={{
              background: `linear-gradient(90deg, ${theme.pipelineLine1} 0%, ${theme.pipelineLine2} 100%)`,
              color: "white",
              fontSize: "28px",
              fontWeight: 900,
              padding: "24px 60px",
              borderRadius: "24px",
              letterSpacing: "1px",
              boxShadow: `0 15px ${btnGlow}px rgba(${theme.primaryGlow}, 0.35)`,
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "var(--font-jet-brains-mono), monospace",
            }}
          >
            {ctaUrl}
          </div>
          <div
            style={{
              color: "#64748b",
              fontSize: "18px",
              marginTop: "24px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase"
            }}
          >
            👇 Link en el perfil 👇
          </div>
        </div>
      </div>
      
      </div>
    </AbsoluteFill>
  );
};
