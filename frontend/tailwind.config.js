const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   blue: "#1a67f8",
    //   darkBlue: "#050D21",
    //   purple: "#B46CF8;",
    //   lightBlue: "#C9D5EE",
    // },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: "#1a67f8",
        darkBlue: "#050D21",
        purple: "#B46CF8;",
        lightBlue: "#C9D5EE",
      },
    },
  },
  plugins: [],
};
