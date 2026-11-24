import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080b09",
          900: "#0d120e",
          850: "#111813",
          800: "#17201a",
          700: "#222c24",
          600: "#33402f",
        },
        grass: {
          200: "#dcf7a8",
          300: "#c2ec77",
          400: "#a3dc46",
          500: "#84c02a",
          600: "#69a01b",
          700: "#4e7d12",
          800: "#33540e",
          900: "#1c3009",
        },
        gold: {
          300: "#ffe483",
          400: "#ffd53f",
          500: "#f2c518",
          600: "#d3a806",
        },
        paper: {
          DEFAULT: "#f5f3ea",
          deep: "#e9e5d6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Haettenschweiler", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        lift: "0 18px 40px -18px rgba(8, 11, 9, 0.55)",
        ring: "0 0 0 1px rgba(132, 192, 42, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
