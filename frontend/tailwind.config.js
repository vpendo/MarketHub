/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e3a8a",
        },
        secondary: {
          50: "#ecfdf3",
          100: "#d1fae5",
          500: "#22c55e",
          600: "#16a34a",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
        },
        cta: {
          500: "#0b6df0",
          600: "#0957c9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft-xl': '0 15px 50px -20px rgba(15, 23, 42, 0.12)'
      }
    },
  },
  plugins: [],
};

