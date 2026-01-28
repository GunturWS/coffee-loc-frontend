/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Definisikan sebagai custom colors
        coffee: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#d4b9b0",
          400: "#a18072",
          500: "#8b6355",
          600: "#7b4f3f",
          700: "#6c422f",
          800: "#5d3620",
          900: "#4c2b15",
        },
        primary: {
          DEFAULT: "#8B5A2B",
          light: "#A67B5B",
          dark: "#5D4037",
        },
      },
      fontFamily: {
        code: ['"Courier Prime"', "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
