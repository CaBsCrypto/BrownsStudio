export interface IndustryTheme {
  primaryGlow: string; // RGB format "r, g, b"
  secondaryGlow: string; // RGB format "r, g, b"
  textGradient: string;
  chatHeader: string;
  chatHeaderGradient: string;
  chatHeaderColor: string;
  botAvatarGradient: string;
  clientBubble: string;
  clientBubbleText: string;
  checkMarks: string;
  pipelineLine1: string; // Hex
  pipelineLine2: string; // Hex
  pipelineLine3: string; // Hex
  alertBorder1: string; // RGB
  alertBorder2: string; // RGB
  alertBorder3: string; // RGB
}

export const THEMES: Record<string, IndustryTheme> = {
  inmobiliaria: {
    primaryGlow: "0, 240, 255", // Cyan
    secondaryGlow: "168, 85, 247", // Purple
    textGradient: "linear-gradient(180deg, #ffffff 0%, #a5b4fc 100%)",
    chatHeader: "#008069", // Classic WhatsApp Green/Teal
    chatHeaderGradient: "linear-gradient(135deg, #ffffff 0%, #b2dfdb 100%)",
    chatHeaderColor: "#006d5b",
    botAvatarGradient: "linear-gradient(135deg, #00c896 0%, #008069 100%)",
    clientBubble: "#d9fdd3",
    clientBubbleText: "#111b21",
    checkMarks: "#53bdeb",
    pipelineLine1: "#00f0ff", // Cyan
    pipelineLine2: "#6366f1", // Indigo
    pipelineLine3: "#a855f7", // Purple
    alertBorder1: "0, 240, 255",
    alertBorder2: "99, 102, 241",
    alertBorder3: "168, 85, 247",
  },
  abogados: {
    primaryGlow: "212, 175, 55", // Gold/Ochre
    secondaryGlow: "184, 134, 11", // Dark Goldenrod
    textGradient: "linear-gradient(180deg, #ffffff 0%, #fcd34d 100%)",
    chatHeader: "#1f1a17", // Very Dark Brown/Black
    chatHeaderGradient: "linear-gradient(135deg, #fcd34d 0%, #d4af37 100%)",
    chatHeaderColor: "#1f1a17",
    botAvatarGradient: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
    clientBubble: "#fef3c7", // Light Amber/Gold
    clientBubbleText: "#451a03",
    checkMarks: "#d4af37",
    pipelineLine1: "#fbbf24", // Amber
    pipelineLine2: "#d97706", // Amber dark
    pipelineLine3: "#b45309", // Amber darker
    alertBorder1: "251, 191, 36",
    alertBorder2: "217, 119, 6",
    alertBorder3: "180, 83, 9",
  },
  dental: {
    primaryGlow: "14, 165, 233", // Light Blue
    secondaryGlow: "56, 189, 248", // Sky Blue
    textGradient: "linear-gradient(180deg, #ffffff 0%, #bae6fd 100%)",
    chatHeader: "#0284c7", // Medical Blue
    chatHeaderGradient: "linear-gradient(135deg, #ffffff 0%, #bae6fd 100%)",
    chatHeaderColor: "#0369a1",
    botAvatarGradient: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
    clientBubble: "#e0f2fe", // Very light blue
    clientBubbleText: "#0c4a6e",
    checkMarks: "#0284c7",
    pipelineLine1: "#38bdf8",
    pipelineLine2: "#0ea5e9",
    pipelineLine3: "#0284c7",
    alertBorder1: "56, 189, 248",
    alertBorder2: "14, 165, 233",
    alertBorder3: "2, 132, 199",
  },
  default: {
    primaryGlow: "0, 240, 255", 
    secondaryGlow: "168, 85, 247", 
    textGradient: "linear-gradient(180deg, #ffffff 0%, #a5b4fc 100%)",
    chatHeader: "#008069", 
    chatHeaderGradient: "linear-gradient(135deg, #ffffff 0%, #b2dfdb 100%)",
    chatHeaderColor: "#006d5b",
    botAvatarGradient: "linear-gradient(135deg, #00c896 0%, #008069 100%)",
    clientBubble: "#d9fdd3",
    clientBubbleText: "#111b21",
    checkMarks: "#53bdeb",
    pipelineLine1: "#00f0ff", 
    pipelineLine2: "#6366f1", 
    pipelineLine3: "#a855f7", 
    alertBorder1: "0, 240, 255",
    alertBorder2: "99, 102, 241",
    alertBorder3: "168, 85, 247",
  }
};

export const getTheme = (industry: string): IndustryTheme => {
  return THEMES[industry.toLowerCase()] || THEMES.default;
};
