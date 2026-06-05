import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
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

export const getAppearFrame = (index: number) => {
  // Delays designed to simulate realistic typing and reading time
  const frames = [
    30,   // Msg 0 (Client)
    100,  // Msg 1 (Bot)
    200,  // Msg 2 (Client)
    300,  // Msg 3 (Bot)
    420,  // Msg 4 (Client)
    520,  // Msg 5 (Bot)
    640,  // Msg 6 (Client)
    740,  // Msg 7 (Bot)
    860,  // Msg 8
    960,  // Msg 9
  ];
  return frames[index] !== undefined ? frames[index] : 960 + (index - 9) * 100;
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

  // Scroll dynamically for longer conversations (messages 5, 6, 7)
  const scrollY = interpolate(
    frame,
    // Start scrolling even later, pushed back to frame 600
    [600, 650, 720, 770, 820, 870],
    [0, 180, 180, 360, 360, 550],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        fontFamily: "Outfit, 'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Premium Ambient Background Behind the Phone */}
      <AbsoluteFill>
        <Img 
          src={staticFile("images/dental_clinic_modern_bg.png")} 
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6, filter: "blur(20px)" }} 
        />
      </AbsoluteFill>
      <AbsoluteFill 
        style={{ 
          background: `radial-gradient(circle at center, rgba(${theme.secondaryGlow}, 0.3) 0%, rgba(${theme.primaryGlow}, 0.15) 50%, rgba(5, 11, 20, 0.4) 100%)` 
        }} 
      />

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
          backgroundColor: isAbogados ? "#0b141a" : "#efeae2", 
        }}>

          {/* WhatsApp wallpaper */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
              backgroundSize: "400px",
              opacity: isAbogados ? 0.08 : 0.45,
              filter: isAbogados ? "invert(1)" : "none", // Makes the pattern white for dark mode
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ─── NATIVE HEADER ─── */}
          <div
            style={{
              backgroundColor: isAbogados ? "#202c33" : "#075e54", 
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
                
                // In a realistic view, client (user reading) is right (green), bot is left (grey)
                // But from the business perspective (our bot), bot might be right.
                // Assuming client = user asking question (right), bot = answering (left).
                // Or vice versa. Usually, demo videos show the customer's phone, so client = right (green), bot = left (grey).
                const bubbleBg = isClient ? (isAbogados ? "#005c4b" : "#dcf8c6") : (isAbogados ? "#202c33" : "#ffffff");
                const bubbleTextColor = isAbogados ? "#e9edef" : "#111b21";

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
                        backgroundColor: bubbleBg,
                        color: bubbleTextColor,
                        borderRadius: isClient ? "16px 0px 16px 16px" : "0px 16px 16px 16px",
                        padding: "18px 24px",
                        fontSize: 26,
                        maxWidth: "85%",
                        lineHeight: 1.4,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        position: "relative",
                      }}
                    >
                      {/* Tail triangle */}
                      <svg viewBox="0 0 8 13" width="16" height="26" style={{
                        position: "absolute",
                        top: 0,
                        [isClient ? "right" : "left"]: -15,
                        color: bubbleBg,
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
                        <span style={{ fontSize: 16, color: isAbogados ? "#8696a0" : "#667781" }}>08:4{5 + i}</span>
                        {isClient && <span style={{ fontSize: 20, color: isAbogados ? "#53bdeb" : "#53bdeb", fontWeight: "bold", letterSpacing: "-3px" }}>✓✓</span>}
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
                      backgroundColor: isAbogados ? "#202c33" : "#ffffff",
                      borderRadius: "0px 16px 16px 16px",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      position: "relative",
                    }}
                  >
                    <svg viewBox="0 0 8 13" width="16" height="26" style={{
                      position: "absolute",
                      top: 0,
                      left: -15,
                      color: isAbogados ? "#202c33" : "#ffffff",
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
              backgroundColor: isAbogados ? "#202c33" : "#ffffff",
              borderRadius: "40px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
              border: "none",
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
