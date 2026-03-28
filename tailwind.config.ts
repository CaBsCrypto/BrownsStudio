import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Obsidian Lens — Surface hierarchy ──────────────────────────────
        surface: {
          base:    "#000000",   // surface_container_lowest — the void
          DEFAULT: "#0e0e0e",   // surface
          low:     "#131313",   // surface_container_low
          mid:     "#191919",   // surface_container
          high:    "#1f1f1f",   // surface_container_high
          highest: "#262626",   // surface_container_highest
          bright:  "#2c2c2c",   // hover / active state
        },
        space:          "#0a0f1e",  // secondary_container — deep navy
        primary:        "#c6c6c7",  // silver metallic
        secondary:      "#939eb5",  // desaturated blue-silver
        tertiary:       "#47c4ff",  // AI electric blue — active states
        "tertiary-dim": "#05a9e3",  // subdued AI blue — orbs / underlights
        on: {
          surface:         "#e5e5e5", // high-readability text (never pure white)
          "surface-variant": "#9e9e9e", // secondary text
          primary:         "#000000", // text on metallic CTAs
        },
        outline: "#484848", // ghost border — used at 15% opacity max

        // ── Backward-compat aliases (used by existing components) ──────────
        accent: {
          gold:        "#c6c6c7", // → silver
          "gold-light":"#d4d4d5",
          "gold-bright":"#e5e5e5",
          cream:       "#939eb5",
          "cream-dark":"#7a86a0",
        },
        bg: {
          primary:   "#000000",  // was #0D0B0A
          secondary: "#0e0e0e",  // was #1A1614
          tertiary:  "#1f1f1f",  // was #231F1C
          card:      "#191919",  // was #2A2420
          light:     "#000000",  // was #F8F5EF → now dark (key for section flip)
          "light-2": "#0e0e0e",  // was #EDE7DC → now dark
        },
        text: {
          primary:   "#e5e5e5", // was #FAF7F4
          secondary: "#9e9e9e", // was #C4B8B0
          muted:     "#5a5a5a", // was #8A7F78
        },
      },

      fontFamily: {
        display: ["var(--font-space-grotesk)", "Inter", "system-ui", "sans-serif"],
        body:    ["var(--font-dm-sans)", "Inter", "system-ui", "sans-serif"],
      },

      letterSpacing: {
        "display": "-0.03em",
        "display-tight": "-0.04em",
      },

      backgroundImage: {
        // Metallic 135° — the signature CTA / gradient-text gradient
        "gradient-metallic": "linear-gradient(135deg, #c6c6c7 0%, #939eb5 100%)",
        // Deep void hero bg
        "gradient-warm":
          "linear-gradient(180deg, #000000 0%, #0a0f1e 60%, #000000 100%)",
        // Subtle AI orb underlights
        "gradient-hero":
          "radial-gradient(ellipse at 20% 30%, rgba(5,169,227,0.07) 0%, transparent 60%), " +
          "radial-gradient(ellipse at 80% 70%, rgba(147,158,181,0.05) 0%, transparent 60%)",
        // Metallic (replaces gradient-gold for backward compat)
        "gradient-gold": "linear-gradient(135deg, #c6c6c7 0%, #939eb5 100%)",
      },

      animation: {
        "fade-up":    "fadeUp 0.6s ease-out forwards",
        "fade-in":    "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
        "grain":      "grain 0.5s steps(1) infinite",
        "shimmer":    "shimmer 3s linear infinite",
      },

      keyframes: {
        fadeUp:  {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn:  {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float:   {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
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
        // Silver ambient glow (replaces gold glow)
        gold:      "0 0 24px rgba(198,198,199,0.18)",
        "gold-lg": "0 0 48px rgba(198,198,199,0.12)",
        // Tertiary electric glow
        tertiary:  "0 0 24px rgba(71,196,255,0.2)",
        // Ambient refraction shadow for modals/floats
        ambient:   "0 32px 64px rgba(147,158,181,0.08)",
        card:      "0 4px 30px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
