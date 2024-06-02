/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barBackground:"#94B9FF",
        barButtonBackground:"#000000"

      },
    },
  },
  plugins: [],
}

