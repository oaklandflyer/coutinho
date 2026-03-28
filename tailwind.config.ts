import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        body:    ['"DM Sans"',    "sans-serif"],
        mono:    ['"DM Mono"',    "monospace"],
      },
      colors: {
        bg:    "#0e0d0b",
        panel: "#1a1a1a",
        sky:   "#4a9eff",
        amber: "#c8873a",
        ink:   "#e8e4dd",
      },
    },
  },
} satisfies Config;
