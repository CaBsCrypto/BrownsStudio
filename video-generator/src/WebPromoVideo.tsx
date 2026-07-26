import React from "react";
import { Composition, CalculateMetadataFunction, staticFile, AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { getAudioDuration } from "./utils/get-audio-duration";

// --- Types ---
interface WebPromoProps {
  scene1DurationInFrames: number;
  scene2DurationInFrames: number;
  scene3DurationInFrames: number;
}

// --- Components ---

const Scene1: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns zoom effect
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.15]);
  
  // Fade out at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Audio 1: "¿Aún usas una página web anticuada y lenta que espanta a tus clientes? El 53% abandona tu web si tarda en cargar."
  // Approx timings (at 30fps):
  // "Aún usas..." (0-130 frames)
  // "El 53%..." (130 frames onwards)

  const text1Entrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.8 },
  });
  
  const text1Exit = interpolate(frame, [110, 125], [1, 0], { extrapolateRight: "clamp" });

  const numberEntrance = spring({
    frame: frame - 130, // Start entering when she says "El 53%"
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const text2Entrance = spring({
    frame: frame - 145, // Slightly after number
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity }}>
      <Img 
        src={staticFile("images/webpromo_scene1_v2.png")} 
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          transform: `scale(${scale})`
        }} 
      />
      {/* Dark overlay for readability */}
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
      
      {/* First part text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "40px", opacity: text1Exit }}>
        <h2 style={{
          fontSize: "60px",
          fontWeight: 800,
          color: "#ffffff",
          textAlign: "center",
          margin: 0,
          transform: `translateY(${(1 - text1Entrance) * 40}px)`,
          opacity: text1Entrance,
          textShadow: "0px 4px 20px rgba(0,0,0,0.8)",
        }}>
          ¿TU PÁGINA WEB<br/>ESPANTA CLIENTES?
        </h2>
      </AbsoluteFill>

      {/* Second part text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "40px" }}>
        <h1 style={{
          fontSize: "180px",
          fontWeight: 900,
          color: "#ef4444", // Red-500
          margin: 0,
          lineHeight: 1,
          transform: `scale(${numberEntrance})`,
          opacity: numberEntrance,
          textShadow: "0px 10px 30px rgba(239, 68, 68, 0.4)",
        }}>
          53%
        </h1>
        <h2 style={{
          fontSize: "50px",
          fontWeight: 800,
          color: "#ffffff",
          textAlign: "center",
          marginTop: "20px",
          transform: `translateY(${(1 - text2Entrance) * 40}px)`,
          opacity: text2Entrance,
          textShadow: "0px 4px 20px rgba(0,0,0,0.8)",
        }}>
          ABANDONA TU WEB<br/>SI TARDA EN CARGAR
        </h2>
      </AbsoluteFill>

      <Audio src={staticFile("voiceovers/webpromo_scene1.mp3")} />
    </AbsoluteFill>
  );
};

const Scene2: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Wipe transition from left
  const clipPath = interpolate(frame, [0, 15], [0, 100], { extrapolateRight: "clamp" });
  
  const scale = interpolate(frame, [0, durationInFrames], [1.1, 1]);

  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Audio 2: "Lleva tu negocio al siguiente nivel. Danos tus requerimientos y nosotros nos encargamos del resto."
  // "Lleva tu negocio al siguiente nivel" -> 0-60 frames
  // "Danos tus requerimientos" -> 60-105 frames
  // "y nosotros nos encargamos del resto" -> 105 onwards

  const t1Entrance = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const t2Entrance = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const t3Entrance = spring({ frame: frame - 105, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity, clipPath: `polygon(0 0, ${clipPath}% 0, ${clipPath}% 100%, 0 100%)` }}>
      <Img 
        src={staticFile("images/webpromo_scene2_v2.png")} 
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          transform: `scale(${scale})`
        }} 
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "40px" }}>
        
        <div style={{
           backgroundColor: "rgba(0, 0, 0, 0.6)",
           backdropFilter: "blur(12px)",
           border: "1px solid rgba(255, 255, 255, 0.15)",
           padding: "15px 40px",
           borderRadius: "40px",
           marginBottom: "40px",
           transform: `translateY(${(1 - t1Entrance) * 20}px)`,
           opacity: t1Entrance,
           boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}>
          <h3 style={{
            fontSize: "42px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            margin: 0,
            letterSpacing: "1px",
            textShadow: "0px 2px 10px rgba(0,0,0,0.8)",
          }}>
            LLEVA TU NEGOCIO AL SIGUIENTE NIVEL
          </h3>
        </div>

        <h2 style={{
          fontSize: "65px",
          fontWeight: 800,
          color: "#ffffff",
          textAlign: "center",
          margin: 0,
          transform: `scale(${t2Entrance})`,
          opacity: t2Entrance,
          textShadow: "0px 4px 20px rgba(0,0,0,0.8)",
        }}>
          DANOS TUS REQUERIMIENTOS
        </h2>

        <div style={{
           marginTop: "30px",
           backgroundColor: "#10b981",
           padding: "15px 40px",
           borderRadius: "15px",
           transform: `translateY(${(1 - t3Entrance) * 30}px)`,
           opacity: t3Entrance,
           boxShadow: "0 15px 30px rgba(16, 185, 129, 0.3)",
        }}>
          <span style={{ color: "#fff", fontSize: "45px", fontWeight: "bold" }}>
            NOSOTROS NOS ENCARGAMOS
          </span>
        </div>
      </AbsoluteFill>

      <Audio src={staticFile("voiceovers/webpromo_scene2.mp3")} />
    </AbsoluteFill>
  );
};

const Scene3: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Audio 3: "Diseño moderno, ultrarrápido y optimizado para vender. Agenda una reunión hoy en Browns Studio."
  // "Diseño moderno" -> 15 frames
  // "ultrarrápido" -> 45 frames
  // "optimizado para vender" -> 90 frames
  // "Agenda una reunión hoy..." -> 140 frames

  const f1Entrance = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const f2Entrance = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const f3Entrance = spring({ frame: frame - 90, fps, config: { damping: 12 } });

  const ctaEntrance = spring({
    frame: frame - 140, 
    fps,
    config: { damping: 14 }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity }}>
      <Img 
        src={staticFile("images/webpromo_scene3_v5.png")} 
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          transform: `scale(${scale})`
        }} 
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
      
      {/* Feature Texts */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: "250px" }}>
        <h3 style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "#10b981", // Emerald
            margin: 0,
            transform: `translateX(${(1 - f1Entrance) * -50}px)`,
            opacity: f1Entrance,
            textShadow: "0px 4px 15px rgba(0,0,0,0.8)",
        }}>
            DISEÑO MODERNO
        </h3>
        <h3 style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "#ffffff",
            margin: "20px 0",
            transform: `translateX(${(1 - f2Entrance) * 50}px)`,
            opacity: f2Entrance,
            textShadow: "0px 4px 15px rgba(0,0,0,0.8)",
        }}>
            ULTRARRÁPIDO
        </h3>
        <h3 style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "#38bdf8", // Sky Blue
            margin: 0,
            transform: `translateY(${(1 - f3Entrance) * 50}px)`,
            opacity: f3Entrance,
            textShadow: "0px 4px 15px rgba(0,0,0,0.8)",
        }}>
            OPTIMIZADO PARA VENDER
        </h3>
      </AbsoluteFill>

      {/* CTA Box */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: "65%" }}>
         <div style={{
           transform: `translateY(${(1 - ctaEntrance) * 50}px)`,
           opacity: ctaEntrance,
           backgroundColor: "#ffffff",
           padding: "35px 80px",
           borderRadius: "100px", // Premium pill shape
           boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255,255,255,0.2)",
           display: "flex",
           flexDirection: "column",
           alignItems: "center"
         }}>
            <span style={{ 
              color: "#0f172a", // Ultra dark slate for maximum contrast 
              fontSize: "80px", 
              fontWeight: "900", 
              fontFamily: "Inter", 
              letterSpacing: "-3px" 
            }}>
              browns.studio
            </span>
         </div>
      </AbsoluteFill>

      <Audio src={staticFile("voiceovers/webpromo_scene3.mp3")} />
    </AbsoluteFill>
  );
};

export const WebPromoComposition: React.FC<WebPromoProps> = ({ scene1DurationInFrames, scene2DurationInFrames, scene3DurationInFrames }) => {
  const t1 = scene1DurationInFrames - 25;
  const t2 = t1 + scene2DurationInFrames - 25;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: "Inter, sans-serif" }}>
      <Sequence from={0} durationInFrames={scene1DurationInFrames}>
         <Scene1 durationInFrames={scene1DurationInFrames} />
      </Sequence>
      
      <Sequence from={t1} durationInFrames={scene2DurationInFrames}>
         <Scene2 durationInFrames={scene2DurationInFrames} />
      </Sequence>
      
      <Sequence from={t2} durationInFrames={scene3DurationInFrames}>
         <Scene3 durationInFrames={scene3DurationInFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};

// --- Calculate Metadata ---
const calculateMetadata: CalculateMetadataFunction<WebPromoProps> = async ({ props }) => {
  try {
    const d1 = await getAudioDuration(staticFile("voiceovers/webpromo_scene1.mp3"));
    const d2 = await getAudioDuration(staticFile("voiceovers/webpromo_scene2.mp3"));
    const d3 = await getAudioDuration(staticFile("voiceovers/webpromo_scene3.mp3"));

    const d1_f = Math.ceil(d1 * 30);
    const d2_f = Math.ceil(d2 * 30);
    const d3_f = Math.ceil(d3 * 30);

    const f1 = d1_f + 15;
    const f2 = d2_f + 15;
    const f3 = d3_f + 30;

    const totalDuration = f1 + f2 + f3 - 50;

    return {
      durationInFrames: totalDuration,
      props: {
        ...props,
        scene1DurationInFrames: f1,
        scene2DurationInFrames: f2,
        scene3DurationInFrames: f3,
      },
    };
  } catch (e) {
    console.warn("Could not calculate audio duration, using fallbacks:", e);
    return {
      durationInFrames: 500,
      props: {
        ...props,
        scene1DurationInFrames: 180,
        scene2DurationInFrames: 180,
        scene3DurationInFrames: 180,
      },
    };
  }
};

export const WebPromoVideo: React.FC = () => {
  return (
    <Composition
      id="WebPromo"
      component={WebPromoComposition}
      durationInFrames={500}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        scene1DurationInFrames: 180,
        scene2DurationInFrames: 180,
        scene3DurationInFrames: 180,
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};
