/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barBackground:"#B4C292",
        barButtonBackground:"#3B3923"

      },
    },
  },
  plugins: [],
}

