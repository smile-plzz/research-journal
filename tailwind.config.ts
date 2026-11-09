import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FBF9F5",
          200: "#F4F0E8",
          300: "#EAE4D8",
          400: "#DCD4C5",
          500: "#C4BAA6",
        },
        charcoal: {
          50: "#F6F6F5",
          100: "#E3E2DE",
          200: "#C5C4BE",
          400: "#7A7870",
          600: "#45443F",
          700: "#2D2D2A",
          800: "#20201D",
          900: "#151513",
          950: "#0D0D0C",
        },
        academic: {
          DEFAULT: "#8B3A2B",
          hover: "#732F23",
          light: "#F7EFE9",
          dark: "#D97757",
        },
        sage: {
          DEFAULT: "#436453",
          light: "#EDF3EF",
          dark: "#6F9A82",
        },
        navy: {
          DEFAULT: "#2C3E50",
          light: "#EAF0F6",
          dark: "#5D7C9A",
        },
      },
      fontFamily: {
        serif: [
          '"Newsreader"',
          '"Source Serif 4"',
          '"Charter"',
          '"Georgia"',
          "Cambria",
          "serif",
        ],
        sans: [
          '"Geist Sans"',
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

