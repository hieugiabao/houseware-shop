/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  mode: process.env.TAILWIND_MODE ? 'jit' : '',
  purge: {
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
