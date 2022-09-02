/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      'nvbg':'#EFFFFD',
      'blue':'#646FD4',
      'white':'#FFFFFF',
      'formbg':'#F7F7F7',
      'btnblue':'#1A73E8'
    },
    boxShadow: {
      "eventbox":"0px 5px 10px 0px rgba(0, 0, 0, 0.5); ",
      "formbox":"0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
      "createform":"0px 2px 3px 0.5px rgba(0, 0, 0, 0.05)",
      "userform" :"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      "formhover" :"0 0 5pt 0.5pt #D3D3D3"

    },
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'], 
        'sora':['Sora', 'sans-serif'],
        'inter':['Inter','sans-serif'],
      }
    },
  },
  plugins: [],
}
