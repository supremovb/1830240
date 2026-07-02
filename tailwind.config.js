/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ef",
        blush: "#f9dce4",
        rosewood: "#8d304d",
        champagne: "#f4d188",
        petal: "#f5a7bc",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 28px 80px rgba(220, 95, 127, 0.24)",
        gold: "0 18px 60px rgba(196, 145, 57, 0.24)",
      },
      keyframes: {
        floatPetal: {
          "0%": { transform: "translate3d(0, -12vh, 0) rotate(0deg)", opacity: "0" },
          "12%": { opacity: "0.8" },
          "100%": { transform: "translate3d(var(--drift), 112vh, 0) rotate(360deg)", opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.08)" },
        },
      },
      animation: {
        glowPulse: "glowPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
