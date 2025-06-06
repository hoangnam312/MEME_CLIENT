/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  // content: [
  //   "./index.html",
  //   "./src/**/*.{ts,tsx}",
  // ],
  theme: {
    extend: {
      colors: {
        "main-background": "#68d69d",
        "main-color": "#401d83",
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
