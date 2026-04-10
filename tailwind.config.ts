import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black:       "#080808",
        "surface":   "#111111",
        "surface-2": "#1a1a1a",
        "border":    "rgba(255,255,255,0.07)",
        "off-white": "#e8e4dc",
        "mid-gray":  "#6B6B6B",
        "soft-gray": "rgba(255,255,255,0.07)",
        charcoal:    "#1C1C1E",
        gold:        "#C9A84C",
        "gold-light":"#D4AF5A",
        "gold-dark": "#9A7A2E",
      },
      fontFamily: {
        sans:  ["var(--font-dm-sans)", "sans-serif"],
        inter: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        card:        "0 2px 24px rgba(0,0,0,0.4)",
        "card-hover":"0 8px 40px rgba(0,0,0,0.6)",
        "gold-glow": "0 4px 28px rgba(201,168,76,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
