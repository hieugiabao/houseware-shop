/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  mode: process.env.TAILWIND_MODE ? 'jit' : '',
  purge: {
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  content: [],
  theme: {
    extend: {
      keyframes: {
        'skeleton-loading': {
          from: {
            'background-color': 'hsl(200, 20%, 80%)',
          },
          to: {
            'background-color': 'hsl(200, 20%, 90%)',
          },
        },
      },
      animation: {
        'skeleton-loading':
          'skeleton-loading 1.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
