import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#F2EDDB",        // notebook paper
          deeper: "#E9E3CA",      // slightly darker paper (section bg)
          card: "#FDFCF2",        // index card off-white
          border: "#D0C9A4",      // aged paper edge
          accent: "#1B55B0",      // blue pen ink
          accentHover: "#144490",
          accentGlow: "rgba(27, 85, 176, 0.14)",
          text: "#1A1714",        // near-black ink
          muted: "#6B6050",       // faded ink
          success: "#2D6A35",     // green pen
          line: "#BDD0E4",        // college-ruled line blue
          margin: "#E88888",      // red margin line
        }
      },
      fontFamily: {
        sans: ['"Lora"', 'Georgia', 'serif'],
        display: ['"Caveat"', 'cursive'],
        mono: ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
