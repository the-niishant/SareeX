import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "var(--ivory)",
        blush: "var(--blush)",
        espresso: "var(--espresso)",
        gold: "var(--gold)",
        maroon: "var(--maroon)",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        manrope: ["var(--font-manrope)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(28, 21, 18, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
