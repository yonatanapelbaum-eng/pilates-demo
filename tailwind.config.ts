import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F1",
        sand: "#EFE6DA",
        blush: "#D9A79B",
        "blush-dark": "#B9847A",
        sage: "#9CAF9A",
        ink: "#3B3330",
        muted: "#7D726D",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-assistant)", "system-ui", "sans-serif"],
        display: ["var(--font-rubik)", "var(--font-assistant)", "sans-serif"],
      },
      // Five type steps for the whole page.
      fontSize: {
        display: ["clamp(40px, 5vw, 80px)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        title: ["clamp(34px, 3.8vw, 58px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        lead: ["clamp(21px, 1.9vw, 28px)", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        body: ["17px", { lineHeight: "1.6" }],
        small: ["15px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        panel: "28px",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
