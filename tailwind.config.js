/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      screens: {
        mxs: { max: "420px" },
        m2lg: { max: "1200px" },
        xxs: { min: "360px" },
        "2lg": { min: "1200px" },
      },
    },
  },
  plugins: [],
};
