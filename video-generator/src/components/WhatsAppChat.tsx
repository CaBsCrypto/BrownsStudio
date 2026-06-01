import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ArrowLeft, Video, Phone, MoreVertical, Paperclip, Camera, Mic, Smile } from "lucide-react";

interface Message {
  sender: "client" | "bot";
  text: string;
}

interface WhatsAppChatProps {
  businessName: string;
  botName: string;
  messages: Message[];
}

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  businessName,
  botName,
  messages = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
  // Bot typing happens 15 frames before any bot message appears.
  let isTyping = false;
  let typingStartTime = 0;
  
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const msgAppearFrame = 20 + i * 45;
    
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

  // Auto-scroll logic: We now have an 8-message flow. The first 7 messages fit nicely.
  // We trigger auto-scroll starting on the 8th message (index 7).
  const visibleMessagesCount = messages.filter((_, i) => frame >= 20 + i * 45).length;
  // Push up 120px for every message past the 7th one
  const targetScrollY = Math.max(0, visibleMessagesCount - 7) * 125;
  
  const scrollY = spring({
    frame: frame - (20 + Math.max(0, visibleMessagesCount - 7) * 45),
    fps,
    config: { damping: 16 },
    from: Math.max(0, visibleMessagesCount - 8) * 125, // previous scroll
    to: targetScrollY,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080e2e", 
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
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
          boxShadow: "0 30px 100px rgba(0,0,0,0.4)",
          backgroundColor: "#efeae2", 
        }}>

          {/* Authentic WhatsApp wallpaper */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
              backgroundSize: "400px",
              opacity: 0.45,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ─── NATIVE HEADER ─── */}
          <div
            style={{
              backgroundColor: "#075e54", 
              padding: "36px 20px 24px 10px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              zIndex: 10,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowLeft color="white" size={36} />
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "#128C7E",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: 28,
                  marginLeft: 8,
                }}
              >
                {businessName.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ marginLeft: 16 }}>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: 32,
                    fontWeight: 500,
                    margin: 0,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {businessName}
                </h3>
                <div style={{ color: "#d1f4ec", fontSize: 20, marginTop: 4 }}>
                  {statusText}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 36, paddingRight: 10 }}>
              <Video color="white" size={36} />
              <Phone color="white" size={32} />
              <MoreVertical color="white" size={36} />
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
              overflow: "hidden", // clip scrolled messages
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              transform: `translateY(-${scrollY}px)`,
            }}>
              
              {/* Date Tag */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div style={{ 
                  backgroundColor: "#e1f3fb", 
                  color: "#54656f", 
                  padding: "8px 20px", 
                  borderRadius: "16px",
                  fontSize: 18,
                  fontWeight: 500,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}>
                  HOY
                </div>
              </div>

              {/* MESSAGES LOOP */}
              {messages.map((msg, i) => {
                const appearFrame = 20 + i * 45;
                if (frame < appearFrame) return null;

                const msgSpring = spring({
                  frame: frame - appearFrame,
                  fps,
                  config: { damping: 9, mass: 0.7 },
                });

                const isClient = msg.sender === "client";

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
                        backgroundColor: isClient ? "#dcf8c6" : "#ffffff",
                        color: "#111b21",
                        borderRadius: isClient ? "16px 0px 16px 16px" : "0px 16px 16px 16px",
                        padding: "16px 20px",
                        fontSize: 26,
                        maxWidth: "85%",
                        lineHeight: 1.4,
                        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                        position: "relative",
                      }}
                    >
                      {/* Tail triangle */}
                      <svg viewBox="0 0 8 13" width="16" height="26" style={{
                        position: "absolute",
                        top: 0,
                        [isClient ? "right" : "left"]: -15,
                        color: isClient ? "#dcf8c6" : "#ffffff",
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
                        marginTop: 4,
                        marginBottom: -8,
                        float: "right",
                        marginLeft: 20
                      }}>
                        <span style={{ fontSize: 16, color: "#667781" }}>10:4{2 + i}</span>
                        {isClient && <span style={{ fontSize: 20, color: "#53bdeb", fontWeight: "bold", letterSpacing: "-3px" }}>✓✓</span>}
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
                      backgroundColor: "#ffffff",
                      borderRadius: "0px 16px 16px 16px",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                      position: "relative",
                    }}
                  >
                    <svg viewBox="0 0 8 13" width="16" height="26" style={{
                      position: "absolute",
                      top: 0,
                      left: -15,
                      color: "#ffffff",
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
                          backgroundColor: "#8696a0",
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
              backgroundColor: "#ffffff",
              borderRadius: "40px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}>
              <Smile color="#8696a0" size={36} />
              <div style={{ flex: 1, color: "#8696a0", fontSize: 24, display: "flex", alignItems: "center", gap: 10 }}>
                Powered by <strong style={{ color: "#000", fontFamily: "Outfit, sans-serif" }}>Browns Studio</strong>
              </div>
              <Paperclip color="#8696a0" size={32} />
              <Camera color="#8696a0" size={32} />
            </div>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#00a884",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}>
              <Mic color="white" size={36} />
            </div>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
