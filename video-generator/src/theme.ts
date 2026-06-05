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
    primaryGlow: "10, 37, 64", // Deep Navy
    secondaryGlow: "212, 175, 55", // Gold/Ochre
    textGradient: "linear-gradient(180deg, #F8FAFC 0%, #D4AF37 100%)",
    chatHeader: "#0A2540", // Deep Navy
    chatHeaderGradient: "linear-gradient(135deg, #0A2540 0%, #050B14 100%)",
    chatHeaderColor: "#F8FAFC",
    botAvatarGradient: "linear-gradient(135deg, #D4AF37 0%, #0A2540 100%)",
    clientBubble: "#1E293B", // Slate-800
    clientBubbleText: "#F8FAFC", // Off-white
    checkMarks: "#D4AF37",
    pipelineLine1: "#D4AF37", // Gold
    pipelineLine2: "#0A2540", // Deep Navy
    pipelineLine3: "#1E3A8A", // Blue-900
    alertBorder1: "212, 175, 55",
    alertBorder2: "10, 37, 64",
    alertBorder3: "30, 58, 138",
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
  training: {
    primaryGlow: "59, 130, 246", // Blue-500
    secondaryGlow: "148, 163, 184", // Slate-400
    textGradient: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
    chatHeader: "#1e293b", // Slate-800
    chatHeaderGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    chatHeaderColor: "#f8fafc",
    botAvatarGradient: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    clientBubble: "#f1f5f9", // Slate-100
    clientBubbleText: "#0f172a", // Slate-900
    checkMarks: "#3b82f6",
    pipelineLine1: "#3b82f6",
    pipelineLine2: "#64748b",
    pipelineLine3: "#1e293b",
    alertBorder1: "59, 130, 246",
    alertBorder2: "148, 163, 184",
    alertBorder3: "30, 41, 59",
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
