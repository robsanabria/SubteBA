/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'arg-azul': 'var(--arg-azul)',
        'arg-celeste': 'var(--arg-celeste)',
        'arg-verde': 'var(--arg-verde)',
        'arg-amarillo': 'var(--arg-amarillo)',
        'arg-rojo': 'var(--arg-rojo)',
        'arg-gris': 'var(--arg-gris)',
        'arg-gris-claro': 'var(--arg-gris-claro)',
        'arg-gris-oscuro': 'var(--arg-gris-oscuro)',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 