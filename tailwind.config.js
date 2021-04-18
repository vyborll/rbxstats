module.exports = {
  method: "jit",
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkgray: {
          800: '#25282c',
          900: '#151719'
        },
        customgreen: {
          900: '#4caf50'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
