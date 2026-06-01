import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Database, Calendar, MessageSquare, Bell, Brain } from "lucide-react";
import { getTheme } from "../theme";

interface PipelineDiagramProps {
  businessName: string;
  crmLabel: string;
  actions: string[];
  industry: string;
}

export const PipelineDiagram: React.FC<PipelineDiagramProps> = ({
  businessName,
  crmLabel,
  actions = [],
  industry,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTheme(industry);
  const isAbogados = industry === "abogados";

  // Scene entrance scaling for content
  const sceneEntrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  // Slow continuous dolly-in zoom for extra cinematic effect
  const slowZoom = interpolate(frame, [0, 180], [1, 1.05]);
  const contentScale = sceneEntrance * slowZoom;

  // Pulse spring of the center Orb when data hits it at frame 35
  const orbPulse = spring({
    frame: frame - 35,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const orbScale = interpolate(orbPulse, [0, 0.5, 1], [1, 1.25, 1]);

  // Alert cards slide-in springs
  const alert0Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 9, mass: 0.7 },
  });

  const alert1Spring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 9, mass: 0.7 },
  });

  const alert2Spring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 9, mass: 0.7 },
  });

  const alert3Spring = spring({
    frame: frame - 130,
    fps,
    config: { damping: 9, mass: 0.7 },
  });

  // Stroke dashoffset for running pulses
  const lineOffset = -frame * 16;

  // Orb rotation speed
  const rotation = frame * 4;

  // TIMING STATES
  const showWhatsAppGlow = frame >= 0;
  const showLine1Glow = frame >= 20;
  const showOrbPulse = frame >= 35;
  const showLine23Glow = frame >= 70;
  const showRightNodesGlow = frame >= 100;

  // ─── CAMERA MOTION (Cinematic 3D Tilt) ───
  const tiltY = interpolate(frame, [0, 180], [-6, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tiltX = interpolate(frame, [0, 180], [3, -2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sudden high-impact screen shake (Frame 510 in video, which is relative frame 0 of scene)
  const getShake = (triggerFrame: number) => {
    const elapsed = frame - triggerFrame;
    if (elapsed < 0 || elapsed > 15) return 0;
    // Bouncy screen shake decay
    return Math.sin(elapsed * 2.2) * 6.0 * Math.max(0, 1 - elapsed / 15);
  };
  
  const shakeX = getShake(0);
  const shakeY = getShake(0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050B14",
        fontFamily: "Outfit, 'Montserrat', sans-serif",
        overflow: "hidden",
        perspective: "1200px",
      }}
    >
      {/* ─── CAMERA CONTAINER ─── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(1.02) rotateY(${tiltY}deg) rotateX(${tiltX}deg) translate(${shakeX}px, ${shakeY}px)`,
        transformStyle: "preserve-3d",
      }}>

      {/* 1. BACKGROUND GLOWS AND GRIDS */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(#152026 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />

      {/* Global backdrop navy ambient lights */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10, 37, 64, 0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Localized node glow aura (Obsidian/Brain - Top Center) */}
      <div
        style={{
          position: "absolute",
          left: "420px",
          top: "230px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(0,0,0,0) 70%)`,
          filter: "blur(20px)",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
        }}
      />

      {/* Localized node glow aura (WhatsApp - Left) */}
      <div
        style={{
          position: "absolute",
          left: "40px",
          top: "580px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 211, 102, 0.12) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(20px)",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
        }}
      />

      {/* Localized node glow aura (Orb - Center) */}
      <div
        style={{
          position: "absolute",
          left: "390px",
          top: "550px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${theme.primaryGlow}, 0.28) 0%, rgba(${theme.secondaryGlow}, 0.15) 50%, rgba(0,0,0,0) 70%)`,
          filter: "blur(30px)",
          transform: `scale(${interpolate(frame, [70, 85], [1, 1.3], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })})`,
        }}
      />

      {/* Localized node glow aura (PJE Chile - Right Top) */}
      <div
        style={{
          position: "absolute",
          left: "760px",
          top: "420px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${theme.secondaryGlow}, 0.15) 0%, rgba(0,0,0,0) 70%)`,
          filter: "blur(20px)",
          opacity: interpolate(frame, [175, 195], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
        }}
      />

      {/* Localized node glow aura (Ley 20886 - Right Bottom) */}
      <div
        style={{
          position: "absolute",
          left: "760px",
          top: "740px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${theme.secondaryGlow}, 0.15) 0%, rgba(0,0,0,0) 70%)`,
          filter: "blur(20px)",
          opacity: interpolate(frame, [175, 200], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
        }}
      />

      {/* ─── INNER CONTENT WRAPPER FOR SCALING ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${contentScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* 2. TITLE SEGMENT */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1]),
          zIndex: 10,
        }}
      >
        <h2
          style={{
            color: theme.pipelineLine1,
            fontSize: "24px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "6px",
            margin: 0,
            textShadow: `0 0 10px rgba(${theme.secondaryGlow}, 0.3)`,
          }}
        >
          {isAbogados ? "Poder Judicial de Chile" : "Infraestructura Agéntica Avanzada"}
        </h2>
        <h1
          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: 900,
            marginTop: 14,
            margin: 0,
            background: theme.textGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          {isAbogados ? "Sincronización Ley 20.886" : "Integración en Tiempo Real"}
        </h1>
      </div>


      {/* 3. CORE SVGS - GLOWING NEON PIPES */}
      <svg
        style={{
          position: "absolute",
          width: "1080px",
          height: "1920px",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* PATH 0: Obsidian (540, 350) -> Orb (540, 700) */}
        <path
          d="M 540 350 L 540 700"
          fill="none"
          stroke={`rgba(212, 175, 55, 0.08)`}
          strokeWidth="14"
        />
        {showLine1Glow && (
          <path
            d="M 540 350 L 540 700"
            fill="none"
            stroke={`rgba(212, 175, 55, 0.4)`}
            strokeWidth="12"
            filter="blur(4px)"
          />
        )}
        <path
          d="M 540 350 L 540 700"
          fill="none"
          stroke={showLine1Glow ? "#D4AF37" : "rgba(255, 255, 255, 0.1)"}
          strokeWidth="6"
          strokeDasharray={showLine1Glow ? "25 100" : "none"}
          strokeDashoffset={lineOffset}
        />

        {/* PATH 1: WhatsApp (160, 700) -> Orb (540, 700) */}
        <path
          d="M 160 700 L 540 700"
          fill="none"
          stroke={`rgba(37, 211, 102, 0.08)`}
          strokeWidth="14"
        />
        {showLine1Glow && (
          <path
            d="M 160 700 L 540 700"
            fill="none"
            stroke={`rgba(37, 211, 102, 0.4)`}
            strokeWidth="12"
            filter="blur(4px)"
          />
        )}
        <path
          d="M 160 700 L 540 700"
          fill="none"
          stroke={showLine1Glow ? "#25d366" : "rgba(255, 255, 255, 0.1)"}
          strokeWidth="6"
          strokeDasharray={showLine1Glow ? "25 100" : "none"}
          strokeDashoffset={lineOffset}
        />

        {/* PATH 2: Orb (540, 700) -> PJE Portal (880, 540) */}
        <path
          d="M 540 700 C 660 700, 760 540, 880 540"
          fill="none"
          stroke={`rgba(10, 37, 64, 0.08)`}
          strokeWidth="14"
        />
        {showLine23Glow && (
          <path
            d="M 540 700 C 660 700, 760 540, 880 540"
            fill="none"
            stroke={`rgba(10, 37, 64, 0.4)`}
            strokeWidth="12"
            filter="blur(4px)"
          />
        )}
        <path
          d="M 540 700 C 660 700, 760 540, 880 540"
          fill="none"
          stroke={showLine23Glow ? theme.pipelineLine2 : "rgba(255, 255, 255, 0.1)"}
          strokeWidth="6"
          strokeDasharray={showLine23Glow ? "25 100" : "none"}
          strokeDashoffset={lineOffset}
        />

        {/* PATH 3: Orb (540, 700) -> Ley Base (880, 860) */}
        <path
          d="M 540 700 C 660 700, 760 860, 880 860"
          fill="none"
          stroke={`rgba(30, 58, 138, 0.08)`}
          strokeWidth="14"
        />
        {showLine23Glow && (
          <path
            d="M 540 700 C 660 700, 760 860, 880 860"
            fill="none"
            stroke={`rgba(30, 58, 138, 0.4)`}
            strokeWidth="12"
            filter="blur(4px)"
          />
        )}
        <path
          d="M 540 700 C 660 700, 760 860, 880 860"
          fill="none"
          stroke={showLine23Glow ? theme.pipelineLine3 : "rgba(255, 255, 255, 0.1)"}
          strokeWidth="6"
          strokeDasharray={showLine23Glow ? "25 100" : "none"}
          strokeDashoffset={lineOffset}
        />
      </svg>


      {/* 4. DIAGRAM NODES */}
      
      {/* NODE 1: WhatsApp Client */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 640,
          width: 120,
          height: 120,
          zIndex: 5,
          borderRadius: "50%",
          backgroundColor: "#050B14",
          border: "3px solid #25d366",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 35px rgba(37, 211, 102, 0.25), inset 0 0 15px rgba(37, 211, 102, 0.1)",
        }}
      >
        <MessageSquare size={52} color="#25d366" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 775,
          width: 200,
          textAlign: "center",
          color: "#25d366",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textShadow: "0 2px 10px rgba(37, 211, 102, 0.3)",
        }}
      >
        WhatsApp Client
      </div>

      {/* NODE 0: Legal Knowledge (Top Center) */}
      <div
        style={{
          position: "absolute",
          left: 480,
          top: 290,
          width: 120,
          height: 120,
          zIndex: 5,
          borderRadius: "50%",
          backgroundColor: "#050B14",
          border: `3px solid ${theme.pipelineLine1}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 0 35px rgba(212, 175, 55, 0.25), inset 0 0 15px rgba(212, 175, 55, 0.1)`,
        }}
      >
        <Brain size={52} color={theme.pipelineLine1} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 250,
          width: 360,
          textAlign: "center",
          color: theme.pipelineLine1,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textShadow: `0 2px 10px rgba(${theme.secondaryGlow}, 0.3)`,
        }}
      >
        Base de Conocimiento Legal
      </div>

      {/* NODE 2: BROWNS STUDIO ORB (Center: Motor IA Legal Chile) */}
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 600,
          width: 200,
          height: 200,
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${orbScale})`,
        }}
      >
        {/* Rotating outer glowing ring */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.pipelineLine1} 0%, ${theme.pipelineLine3} 100%)`,
            transform: `rotate(${rotation}deg)`,
            boxShadow: `0 0 50px rgba(${theme.secondaryGlow}, 0.45), 0 0 100px rgba(${theme.primaryGlow}, 0.25)`,
            filter: "blur(1px)",
          }}
        />
        {/* Solid inner core */}
        <div
          style={{
            position: "absolute",
            width: "82%",
            height: "82%",
            borderRadius: "50%",
            backgroundColor: "#050B14",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1.5px solid rgba(255, 255, 255, 0.15)",
            zIndex: 6,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: theme.pipelineLine1,
              filter: "blur(10px)",
              opacity: 0.8,
            }}
          />
          <span
            style={{
              position: "absolute",
              color: "white",
              fontWeight: 900,
              fontSize: 26,
              letterSpacing: "-1.5px",
            }}
          >
            B.S
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 340,
          top: 830,
          width: 400,
          textAlign: "center",
          color: theme.pipelineLine1,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textShadow: `0 2px 15px rgba(${theme.secondaryGlow}, 0.5)`,
        }}
      >
        Motor IA Legal Chile
      </div>

      {/* NODE 3: PJE Portal Connection (Right Top) */}
      <div
        style={{
          position: "absolute",
          left: 820,
          top: 480,
          width: 120,
          height: 120,
          zIndex: 5,
          borderRadius: "50%",
          backgroundColor: "#050B14",
          border: `3px solid ${interpolate(frame, [175, 195], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) > 0.5 ? theme.pipelineLine2 : "rgba(255,255,255,0.08)"}`,
          boxShadow: `0 0 ${interpolate(frame, [175, 200], [0, 35], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px rgba(${theme.alertBorder2}, 0.35), inset 0 0 15px rgba(${theme.alertBorder2}, 0.15)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Database size={52} color={showRightNodesGlow ? theme.pipelineLine2 : "#475569"} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 780,
          top: 615,
          width: 200,
          textAlign: "center",
          color: showRightNodesGlow ? theme.pipelineLine2 : "#475569",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textShadow: showRightNodesGlow ? `0 2px 10px rgba(${theme.alertBorder2}, 0.3)` : "none",
        }}
      >
        PJE Portal
      </div>

      {/* NODE 4: Ley 20.886 Data Base (Right Bottom) */}
      <div
        style={{
          position: "absolute",
          left: 820,
          top: 800,
          width: 120,
          height: 120,
          zIndex: 5,
          borderRadius: "50%",
          backgroundColor: "#050B14",
          border: `3px solid ${interpolate(frame, [175, 195], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) > 0.5 ? theme.pipelineLine3 : "rgba(255,255,255,0.08)"}`,
          boxShadow: `0 0 ${interpolate(frame, [175, 200], [0, 35], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px rgba(${theme.alertBorder3}, 0.35), inset 0 0 15px rgba(${theme.alertBorder3}, 0.15)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Calendar size={52} color={showRightNodesGlow ? theme.pipelineLine3 : "#475569"} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 780,
          top: 935,
          width: 200,
          textAlign: "center",
          color: showRightNodesGlow ? theme.pipelineLine3 : "#475569",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          textShadow: showRightNodesGlow ? `0 2px 10px rgba(${theme.alertBorder3}, 0.3)` : "none",
        }}
      >
        Ley 20.886
      </div>


      {/* 5. BALANCED VERTICALLY STACKED GLASSMORPHIC ALERTS */}
      <div
        style={{
          position: "absolute",
          top: 1080, 
          left: 140,
          width: "800px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* Alert 0: Obsidian Knowledge Retrieval */}
        {frame >= 30 && (
          <div
            style={{
              transform: `translateY(${(1 - alert0Spring) * 35}px)`,
              opacity: alert0Spring,
              backgroundColor: "rgba(10, 18, 30, 0.85)",
              border: `1px solid rgba(212, 175, 55, 0.25)`,
              borderRadius: "24px",
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              backdropFilter: "blur(20px)",
              boxShadow: `0 10px 30px rgba(212, 175, 55, 0.08)`,
            }}
          >
            <Brain size={32} color="#D4AF37" />
            <div>
              <div style={{ color: "#D4AF37", fontWeight: 800, fontSize: 18, letterSpacing: "1px", textTransform: "uppercase" }}>Base de Conocimiento</div>
              <div style={{ color: "#e2e8f0", fontSize: 22, marginTop: 6, fontWeight: 500 }}>
                Recuperando: <strong style={{ color: "#ffffff" }}>Respuestas Entrenadas (Ley 20.886)</strong>
              </div>
            </div>
          </div>
        )}

        {/* Alert 1: Processing */}
        {frame >= 60 && (
          <div
            style={{
              transform: `translateY(${(1 - alert1Spring) * 35}px)`,
              opacity: alert1Spring,
              backgroundColor: "rgba(10, 18, 30, 0.85)",
              border: `1px solid rgba(${theme.alertBorder1}, 0.25)`,
              borderRadius: "24px",
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              backdropFilter: "blur(20px)",
              boxShadow: `0 10px 30px rgba(${theme.alertBorder1}, 0.08)`,
            }}
          >
            <span style={{ fontSize: 32 }}>🧠</span>
            <div>
              <div style={{ color: theme.pipelineLine1, fontWeight: 800, fontSize: 18, letterSpacing: "1px", textTransform: "uppercase" }}>Agente Legal Chile</div>
              <div style={{ color: "#e2e8f0", fontSize: 22, marginTop: 6, fontWeight: 500 }}>
                Lead Calificado: <strong style={{ color: "#ffffff" }}>{crmLabel}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Alert 2: HubSpot & Calendly Synced */}
        {frame >= 100 && (
          <div
            style={{
              transform: `translateY(${(1 - alert2Spring) * 35}px)`,
              opacity: alert2Spring,
              backgroundColor: "rgba(10, 18, 30, 0.85)",
              border: `1px solid rgba(10, 37, 64, 0.3)`,
              borderRadius: "24px",
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              backdropFilter: "blur(20px)",
              boxShadow: `0 10px 30px rgba(10, 37, 64, 0.1)`,
            }}
          >
            <span style={{ fontSize: 32 }}>⚡</span>
            <div>
              <div style={{ color: "#F8FAFC", fontWeight: 800, fontSize: 18, letterSpacing: "1px", textTransform: "uppercase" }}>Integración PJE</div>
              <div style={{ color: "#e2e8f0", fontSize: 22, marginTop: 6, fontWeight: 500 }}>
                {actions[0]} & {actions[1]}
              </div>
            </div>
          </div>
        )}

        {/* Alert 3: Slack/SMS Notification */}
        {frame >= 130 && (
          <div
            style={{
              transform: `translateY(${(1 - alert3Spring) * 35}px)`,
              opacity: alert3Spring,
              backgroundColor: "rgba(10, 18, 30, 0.85)",
              border: `1px solid rgba(30, 58, 138, 0.3)`,
              borderRadius: "24px",
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              backdropFilter: "blur(20px)",
              boxShadow: `0 10px 30px rgba(30, 58, 138, 0.1)`,
            }}
          >
            <Bell size={32} color={theme.pipelineLine3} />
            <div>
              <div style={{ color: theme.pipelineLine3, fontWeight: 800, fontSize: 18, letterSpacing: "1px", textTransform: "uppercase" }}>Notificación Instante</div>
              <div style={{ color: "#e2e8f0", fontSize: 22, marginTop: 6, fontWeight: 500 }}>
                {actions[2]}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Close inner content wrapper */}
      </div>
      </div>
    </AbsoluteFill>
  );
};
