import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        cream: {
          DEFAULT: "#f4efe6",
          50: "#faf8f4",
          100: "#f4efe6",
          200: "#ebe4d4",
          300: "#dfd5c0",
        },
        brown: {
          DEFAULT: "#231a12",
          400: "#6b4f38",
          500: "#4a3425",
          600: "#3d2e20",
          700: "#2c1f14",
          800: "#231a12",
          900: "#160f09",
        },
        terra: {
          DEFAULT: "#b85535",
          light: "#d06b47",
          dark: "#8c3e22",
        },
        sand: "#8c7055",
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
