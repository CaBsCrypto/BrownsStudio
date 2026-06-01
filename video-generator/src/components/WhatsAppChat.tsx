import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ArrowLeft, Video, Phone, MoreVertical, Paperclip, Camera, Mic, Smile } from "lucide-react";
import { getTheme } from "../theme";

interface Message {
  sender: "client" | "bot";
  text: string;
}

interface WhatsAppChatProps {
  businessName: string;
  botName: string;
  messages: Message[];
  industry?: string;
}

const getAppearFrame = (index: number) => {
  const frames = [0, 75, 150, 230, 320];
  return frames[index] !== undefined ? frames[index] : 20 + index * 45;
};

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  businessName,
  botName,
  messages = [],
  industry = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = getTheme(industry);
  const isAbogados = industry === "abogados";

  // Very subtle 3D camera zoom
  const cameraZoom = spring({
    frame: frame - 20, 
    fps,
    config: { damping: 200, mass: 1 },
    from: 0.96,
    to: 0.98,
  }) + spring({
    frame: frame - 125, 
    fps,
    config: { damping: 200, mass: 1 },
    from: 0,
    to: 0.02,
  });

  // Calculate if the bot is currently typing
  let isTyping = false;
  let typingStartTime = 0;
  
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const msgAppearFrame = getAppearFrame(i);
    
    if (msg.sender === "bot") {
      const typingStart = msgAppearFrame - 15;
      if (frame >= typingStart && frame < msgAppearFrame) {
        isTyping = true;
        typingStartTime = typingStart;
        break;
      }
    }
  }

  // Typing bubble entrance
  const typingSpring = spring({
    frame: frame - typingStartTime,
    fps,
    config: { damping: 9, mass: 0.7 },
  });

  // Bouncing dots
  const getDotBounce = (offset: number) => {
    if (!isTyping) return 0;
    const bounce = Math.sin((frame - typingStartTime) * 0.4 - offset) * 5;
    return Math.max(0, bounce);
  };

  // Status text
  let statusText = "en línea";
  if (isTyping) {
    statusText = "escribiendo...";
  }

  // Continuous, clamped scrollY driven by frame progression
  const scrollY = interpolate(
    frame,
    [130, 150, 210, 230, 300, 320],
    [0, 180, 180, 520, 520, 920],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050B14", 
        fontFamily: "Outfit, 'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{
        perspective: "1200px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transform: `rotateY(-2deg) rotateX(1deg) scale(${cameraZoom})`,
          transformStyle: "preserve-3d",
          boxShadow: "0 30px 100px rgba(0,0,0,0.5)",
          backgroundColor: isAbogados ? "#050B14" : "#efeae2", 
        }}>

          {/* WhatsApp wallpaper */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
              backgroundSize: "400px",
              opacity: isAbogados ? 0.06 : 0.45,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ─── NATIVE HEADER ─── */}
          <div
            style={{
              backgroundColor: isAbogados ? "#0A2540" : "#075e54", 
              padding: "36px 20px 24px 10px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              zIndex: 10,
              flexShrink: 0,
              borderBottom: isAbogados ? "1px solid rgba(212, 175, 55, 0.2)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowLeft color={isAbogados ? "#D4AF37" : "white"} size={36} />
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: isAbogados ? theme.botAvatarGradient : "linear-gradient(135deg, #00c896 0%, #008069 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: isAbogados ? "#0A2540" : "#ffffff",
                  fontWeight: 800,
                  fontSize: 28,
                  marginLeft: 8,
                }}
              >
                {botName.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ marginLeft: 16 }}>
                <h3
                  style={{
                    color: "#F8FAFC",
                    fontSize: 32,
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {businessName}
                </h3>
                <div style={{ color: isAbogados ? "#D4AF37" : "#d1f4ec", fontSize: 20, marginTop: 4, fontWeight: 500 }}>
                  {statusText}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 36, paddingRight: 10 }}>
              <Video color={isAbogados ? "#D4AF37" : "white"} size={36} />
              <Phone color={isAbogados ? "#D4AF37" : "white"} size={32} />
              <MoreVertical color={isAbogados ? "#D4AF37" : "white"} size={36} />
            </div>
          </div>

          {/* ─── CHAT AREA ─── */}
          <div
            style={{
              flex: 1,
              padding: "40px 30px",
              display: "flex",
              flexDirection: "column",
              zIndex: 5,
              position: "relative",
              overflow: "hidden", 
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              transform: `translateY(-${scrollY}px)`,
            }}>
              
              {/* Date Tag */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div style={{ 
                  backgroundColor: isAbogados ? "rgba(10, 37, 64, 0.6)" : "#e1f3fb", 
                  color: isAbogados ? "#F8FAFC" : "#54656f", 
                  padding: "8px 20px", 
                  borderRadius: "16px",
                  fontSize: 18,
                  fontWeight: 600,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  border: isAbogados ? "1px solid rgba(212, 175, 55, 0.15)" : "none",
                }}>
                  HOY
                </div>
              </div>

              {/* MESSAGES LOOP */}
              {messages.map((msg, i) => {
                const appearFrame = getAppearFrame(i);
                if (frame < appearFrame) return null;

                const msgSpring = spring({
                  frame: frame - appearFrame,
                  fps,
                  config: { damping: 9, mass: 0.7 },
                });

                const isClient = msg.sender === "client";
                const bubbleBg = isClient ? theme.clientBubble : theme.pipelineLine3; 
                const bubbleTextColor = isClient ? theme.clientBubbleText : "#F8FAFC";

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: isClient ? "flex-end" : "flex-start",
                      transform: `scale(${msgSpring})`,
                      transformOrigin: isClient ? "right bottom" : "left bottom",
                      marginBottom: 10
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: isAbogados ? bubbleBg : (isClient ? "#dcf8c6" : "#ffffff"),
                        color: isAbogados ? bubbleTextColor : "#111b21",
                        borderRadius: isClient ? "16px 0px 16px 16px" : "0px 16px 16px 16px",
                        padding: "18px 24px",
                        fontSize: 26,
                        maxWidth: "85%",
                        lineHeight: 1.4,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        position: "relative",
                        border: isAbogados ? "1px solid rgba(255,255,255,0.05)" : "none",
                      }}
                    >
                      {/* Tail triangle */}
                      <svg viewBox="0 0 8 13" width="16" height="26" style={{
                        position: "absolute",
                        top: 0,
                        [isClient ? "right" : "left"]: -15,
                        color: isAbogados ? bubbleBg : (isClient ? "#dcf8c6" : "#ffffff"),
                      }}>
                        {isClient ? (
                          <path fill="currentColor" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
                        ) : (
                          <path fill="currentColor" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
                        )}
                      </svg>

                      {msg.text}
                      
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "flex-end", 
                        alignItems: "center", 
                        gap: 6,
                        marginTop: 8,
                        marginBottom: -4,
                        float: "right",
                        marginLeft: 20
                      }}>
                        <span style={{ fontSize: 16, color: isAbogados ? "#94a3b8" : "#667781" }}>10:4{2 + i}</span>
                        {isClient && <span style={{ fontSize: 20, color: isAbogados ? theme.checkMarks : "#53bdeb", fontWeight: "bold", letterSpacing: "-3px" }}>✓✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* TYPING INDICATOR */}
              {isTyping && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    transform: `scale(${typingSpring})`,
                    transformOrigin: "left bottom",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: isAbogados ? theme.pipelineLine3 : "#ffffff",
                      borderRadius: "0px 16px 16px 16px",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      position: "relative",
                    }}
                  >
                    <svg viewBox="0 0 8 13" width="16" height="26" style={{
                      position: "absolute",
                      top: 0,
                      left: -15,
                      color: isAbogados ? theme.pipelineLine3 : "#ffffff",
                    }}>
                      <path fill="currentColor" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
                    </svg>

                    {[0, 0.8, 1.6].map((offset, i) => (
                      <span
                        key={i}
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: isAbogados ? "#F8FAFC" : "#8696a0",
                          display: "block",
                          transform: `translateY(-${getDotBounce(offset)}px)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ─── NATIVE FOOTER INPUT BAR ─── */}
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              zIndex: 10,
              backgroundColor: "transparent",
              marginBottom: "20px"
            }}
          >
            <div style={{
              flex: 1,
              backgroundColor: isAbogados ? "#1E293B" : "#ffffff",
              borderRadius: "40px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              border: isAbogados ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}>
              <Smile color={isAbogados ? "#D4AF37" : "#8696a0"} size={36} />
              <div style={{ flex: 1, color: isAbogados ? "#94a3b8" : "#8696a0", fontSize: 24, display: "flex", alignItems: "center", gap: 10 }}>
                Powered by <strong style={{ color: isAbogados ? "#F8FAFC" : "#000", fontFamily: "Outfit, sans-serif" }}>Browns Studio</strong>
              </div>
              <Paperclip color={isAbogados ? "#D4AF37" : "#8696a0"} size={32} />
              <Camera color={isAbogados ? "#D4AF37" : "#8696a0"} size={32} />
            </div>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: isAbogados ? "#D4AF37" : "#00a884",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
            }}>
              <Mic color={isAbogados ? "#0A2540" : "white"} size={36} />
            </div>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
