import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ledger: {
          paper: "#F5F5F1",
          line: "#DAD8CE",
          ink: "#122036",
          inkmuted: "#4B5768",
          gold: "#B8863B",
          goldsoft: "#EFE2C8",
          due: "#8A2E2E",
          duesoft: "#F3E1DE",
          ok: "#2F5D42",
          oksoft: "#E1EBE4",
        },
      },
      fontFamily: {
        serif: ["Source Serif 4", "Georgia", "serif"],
        sans: [
          "Inter",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: ["IBM Plex Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;