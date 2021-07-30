module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      Roboto: ['Roboto Slab'],
    },
    height:{
      '80':'20rem',
      '98': '26rem',
      '336':'84rem',
    },
    with:{
      '336':'84rem',
    }    

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
