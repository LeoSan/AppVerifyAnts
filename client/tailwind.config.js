module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
       },
       keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
       }     
    },
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
      animation: ['hover', 'focus'],
    },
    opacity: ({ after }) => after(['disabled']),
  },
  plugins: [],
}
