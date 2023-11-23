/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey1: '#1C2129',
        grey2: '#1A120B',
        violet1: '#8583FF',
      },
    },
  },
  plugins: [],
};
