const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gallery: 'repeat(auto-fit, minmax(250px, 1fr))',
        pages: 'repeat(auto-fit, minmax(350px, 1fr))',
      },
      fontFamily: {
        notoSans: ['var(--ont-noto-sans)', 'sans-serif'],
        albertSans: ['var(--font-albert-sans)', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.5rem', '0.75rem'],
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};
