/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    extend: {
      colors:{
        hoverPurple: "#FF81E8",
        textPurple: "#F4DCFF",
        colorBorder: "#440071"
      }
    },
  },
  plugins: [],
}

