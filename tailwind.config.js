/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:"#F0F0F0",
        secondary:"#1E1E1E",
        accent:"#1C916E",
      },
      fontFamily: {
        head: ["PalanquinDark", "sans-serif"],
        body: ["Onest", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      sl: "930px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

