/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        crimson: ["Crimson Text", "serif"],
      },
      screens: {
        xs: "500px", // Add a custom 'xs' breakpoint
        xmd: "1170px",
      },
    },
  },
  plugins: [],
};
