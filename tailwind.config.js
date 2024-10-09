/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },

      colors: {
        background: "#212123",
        goldenYellow: "#C7A676",
        textGrey: "#797979",
        lightBlack: "#2C2C2E",
        textWhite: "#F0F0F0",
        copyright: "#A1A1A1",
        lineGrey: "#ffffff1a",
        beige: "#f3e7d6",
      },
    },
  },
  plugins: [],
};
