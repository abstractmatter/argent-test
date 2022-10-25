// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./{public,src}/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.disable-scrollbars': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent',
            display: 'none',
          },
          '& *::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent',
            display: 'none',
          },
          '& *': {
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          },
        },
        '.no-tap-highlighting': {
          'webkit-tap-highlight-color': 'rgba(0,0,0,0)',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
