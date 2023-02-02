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
        'zoom-1.1': {
          from: {
            transform: 'scale(1)',
          },
          to: {
            transform: 'scale(1.1)',
          },
        },
      },
      animation: {
        'skeleton-loading':
          'skeleton-loading 1.5s ease-in-out infinite alternate',
        'zoom-1.1': 'zoom-1.1 0.5s ease forwards',
      },
    },
  },
  plugins: [],
};
