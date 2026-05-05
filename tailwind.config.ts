import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      "#fcfbf8",
          dark:    "#1c1c1c",
          section: "#f5f4f0",
          border:  "#eceae4",
          text:    "#1c1c1c",
          muted:   "#5f5f5d",
          subtle:  "#9e9d9b",
          success: "#15803d",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"Roboto Mono"', '"Courier New"', "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.025em",
        tight:    "-0.02em",
        widest:   "0.12em",
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem,9vw,8rem)",  { lineHeight: "1",    letterSpacing: "-0.04em",  fontWeight: "700" }],
        "display-lg": ["clamp(2.5rem,6vw,5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "700" }],
        "display-md": ["clamp(1.75rem,4vw,3rem)",  { lineHeight: "1.1",  letterSpacing: "-0.025em", fontWeight: "600" }],
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
