/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...require("tailwindcss/colors"),
      white: "#FFFFFF",
      purple: "#6366F1",
    },
  },

  plugins: [require("daisyui")],
};
