import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"DM Mono"', "monospace"],
      },
      colors: {
        bg: "#0e0d0b",
        panel: "#1a1a1a",
        sky: {
          DEFAULT: "#4a9eff",
          dark: "#2a7fdf",
        },
        amber: {
          DEFAULT: "#c8873a",
          dark: "#a06828",
        },
        ink: {
          DEFAULT: "#e8e4dd",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.9s ease forwards",
        "fade-in": "fadeIn 0.7s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
