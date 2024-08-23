/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      blur: {
        xs: '2px',
      },
      colors :{
        "red-150" : '#E30614',
        "loreal" : '#D8CC92',
        "este" : '#110A2C'
      },
      fontSize:{
        "xxs":'10px',
      }
    },
  },
  plugins: [],
}