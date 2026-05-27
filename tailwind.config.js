/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#10263C',
          800: '#12334E',
        },
        brand: {
          yellow: '#FACF10',
          gold: '#C6A312',
          olive: '#9B821B',
          teal: '#2B98BE',
          cyan: '#23C5E8',
        },
        cream: {
          50: '#FFFEF8',
          100: '#FFF9E8',
          200: '#FFF3D1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
