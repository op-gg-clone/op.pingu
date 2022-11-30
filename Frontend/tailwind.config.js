/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        sm: '480px',
      },
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      noto: ['Noto Sans KR', 'sans-serif'],
    },
  },
  plugins: [],
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
};
