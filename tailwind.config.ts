import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#FFF8F0",
          deeper: "#FEF0E4",
          card: "#FFFCF8",
          border: "#E8D0B8",
          accent: "#D94A0A",
          accentHover: "#B83D08",
          accentGlow: "rgba(217, 74, 10, 0.12)",
          text: "#1C1108",
          muted: "#7C6A58",
          success: "#15803D",
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
