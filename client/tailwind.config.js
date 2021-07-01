module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      Roboto: ['Roboto Slab'],
    },

  },
  variants: {
    cursor: ['hover', 'focus'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    scale: ['hover'],
    rotate:['responsive'],
    extend: {
      padding: ['hover'],
      maxHeight: ['focus'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
