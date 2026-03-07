import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Browns Studio - Paleta dark cálida
        bg: {
          primary: "#0D0B0A",
          secondary: "#1A1614",
          tertiary: "#231F1C",
          card: "#2A2420",
        },
        accent: {
          gold: "#C8956C",
          "gold-light": "#D4A574",
          "gold-bright": "#E0B88A",
          cream: "#F5E6D3",
          "cream-dark": "#E8D5BE",
        },
        text: {
          primary: "#FAF7F4",
          secondary: "#C4B8B0",
          muted: "#8A7F78",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-warm":
          "linear-gradient(135deg, #0D0B0A 0%, #1A1614 50%, #231F1C 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #C8956C 0%, #D4A574 50%, #E0B88A 100%)",
        "gradient-hero":
          "radial-gradient(ellipse at 30% 40%, rgba(200,149,108,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(212,165,116,0.1) 0%, transparent 60%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 0.5s steps(1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-1%, -1%)" },
          "20%": { transform: "translate(1%, 1%)" },
          "30%": { transform: "translate(-1%, 1%)" },
          "40%": { transform: "translate(1%, -1%)" },
          "50%": { transform: "translate(-1%, 0)" },
          "60%": { transform: "translate(1%, 0)" },
          "70%": { transform: "translate(0, 1%)" },
          "80%": { transform: "translate(0, -1%)" },
          "90%": { transform: "translate(1%, 1%)" },
        },
      },
      boxShadow: {
        gold: "0 0 20px rgba(200, 149, 108, 0.3)",
        "gold-lg": "0 0 40px rgba(200, 149, 108, 0.2)",
        card: "0 4px 30px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
