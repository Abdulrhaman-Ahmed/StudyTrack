/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        bg: {
          primary:   "#0b0d14",
          secondary: "#12151f",
          card:      "#181c2a",
          hover:     "#1e2235",
        },
        accent: {
          DEFAULT: "#7c6df8",
          light:   "#a99ef5",
        },
        success: { DEFAULT: "#1fd4a0" },
        txt: {
          primary:   "#eceef5",
          secondary: "#8891b0",
          muted:     "#4f576e",
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        checkPop: {
          from: { transform: "scale(0.4)" },
          to:   { transform: "scale(1)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in":   "fadeIn 0.25s ease both",
        "check-pop": "checkPop 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
        "slide-down":"slideDown 0.2s ease both",
      },
    },
  },
  plugins: [],
}
