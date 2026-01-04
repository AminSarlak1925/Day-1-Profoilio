/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        slate: {
          850: "#1a1a1a", // Deep Charcoal
          900: "#0f1115", // Midnight
        },
      },
    },
  },
  plugins: [],
};
