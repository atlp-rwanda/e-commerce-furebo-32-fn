const { colors } = require("@mui/material");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        black: "#444444",
        white: "#FEFEFE",
        gray: "#979797",
        primary: {
          50: "#e6e8fe",
          100: "#c0c5fc",
          200: "#92a0fa",
          300: "#5a7afa",
          400: "#105cf9",
          500: "#003ee9",
          600: "#0035de",
          700: "#002bd1",
          800: "#001ec3",
          900: "#0001ab",
        },
        secondary: {
          50: "#f5f5f5",
          100: "#efefef",
          200: "#efefef",
          300: "#e2e2e2",
          400: "#bfbfbf",
          500: "#a0a0a0",
          600: "#777777",
          700: "#636363",
          800: "#444444",
          900: "#232323",
        },
      },
    },
  },
  plugins: [],
};
