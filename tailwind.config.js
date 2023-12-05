/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}