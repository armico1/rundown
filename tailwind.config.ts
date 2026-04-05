import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0A0A0A",
          deeper: "#111111",
          card: "#1A1A1A",
          border: "#2A2A2A",
          accent: "#6366F1",
          accentHover: "#818CF8",
          accentGlow: "rgba(99, 102, 241, 0.15)",
          text: "#E5E5E5",
          muted: "#888888",
          success: "#22C55E",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
