/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: ['class', '[class="dark"]', ':global(.dark)'],
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.w-h-full': {
          width: '100%',
          height: '100%',
        },
        '.w-h-screen': {
          width: '100vw',
          height: '100vh',
        },
        '.flex-c': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.flex-items-c': {
          display: 'flex',
          alignItems: 'center',
        },
      })
    }),
  ],
}
