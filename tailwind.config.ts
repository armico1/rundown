import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      "#ffffff",
          dark:    "#0f0f0f",
          section: "#f5f5f5",
          border:  "#e5e5e5",
          text:    "#0f0f0f",
          muted:   "#666666",
          subtle:  "#999999",
          success: "#15803d",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"Roboto Mono"', '"Courier New"', "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.02em",
        widest:   "0.12em",
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem,9vw,8rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["clamp(2.5rem,6vw,5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-md": ["clamp(1.75rem,4vw,3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
