/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2B2D42",
          100: "#1A1C31",
        },
        secondary: "#f50057",
        success: "#4caf50",
        warning: "#ff9800",
        danger: "#d32f2f",
        background: {
          DEFAULT: "#121212"
        },
        surface: "#1e1e1e",
        "text-primary": "#ffffff",
        "text-secondary": "#b0bec5",
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
          200: "#EDF2F4",
        },
      },
    },
  },
  plugins: [],
};
