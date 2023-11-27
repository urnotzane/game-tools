/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '1024px',
        'md': '1200px',
        'lg': '1440px',
        'xl': '1660px',
        '2xl': '1920px',
      }
    },
  },
  plugins: [],
}