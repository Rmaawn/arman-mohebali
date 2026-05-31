import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ── All colors reference CSS variables so a single
           class swap on <html> switches the whole palette ── */
        onyx: {
          DEFAULT: "rgb(var(--color-onyx) / <alpha-value>)",
          50:      "rgb(var(--color-onyx-light) / <alpha-value>)",
          100:     "rgb(var(--color-onyx-100) / <alpha-value>)",
          900:     "rgb(var(--color-onyx-900) / <alpha-value>)",
        },
        ivory: {
          DEFAULT: "rgb(var(--color-ivory) / <alpha-value>)",
          50:      "rgb(var(--color-ivory-50) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--color-gold) / <alpha-value>)",
          50:      "rgb(var(--color-gold-50) / <alpha-value>)",
          100:     "rgb(var(--color-gold-100) / <alpha-value>)",
          500:     "rgb(var(--color-gold) / <alpha-value>)",
          600:     "rgb(var(--color-gold-600) / <alpha-value>)",
          700:     "rgb(var(--color-gold-700) / <alpha-value>)",
        },
        bronze: {
          DEFAULT: "rgb(var(--color-bronze) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans:    ["var(--font-sans)",    "sans-serif"],
        fa:      ["var(--font-fa)",      "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },
      animation: {
        "fade-in":    "fadeIn 0.8s ease-out forwards",
        "slide-up":   "slideUp 0.8s ease-out forwards",
        "shimmer":    "shimmer 3s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(40px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        float:   { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,175,55,0.3)" },
          "50%":       { boxShadow: "0 0 40px rgba(212,175,55,0.6)" },
        },
      },
      backgroundImage: {
        "gold-gradient":  "linear-gradient(135deg,#d4af37 0%,#f4e4a3 50%,#d4af37 100%)",
        "onyx-gradient":  "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 50%,#0a0a0a 100%)",
        "chess-pattern":  "linear-gradient(45deg,#0a0a0a 25%,transparent 25%),linear-gradient(-45deg,#0a0a0a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0a0a0a 75%),linear-gradient(-45deg,transparent 75%,#0a0a0a 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
