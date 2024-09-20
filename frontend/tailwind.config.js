/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      width: {
        '480': '480px',
        '400': '400px',
      }
    },
  },
  plugins: [],
}

