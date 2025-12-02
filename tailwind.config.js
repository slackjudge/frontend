export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        gray:{
          100:"#EDEFF1",
          200:"#8E8989",
          300:"#8E8E93",
          400:"#787880",
        },
        black:{
          100:"#000000",
          200:"#161616",

        },
        yellow:{
          100:"#FFCE5133",
          500:"#FFCE51"
        },
        orange:{
          500:"#FF7324"
        },
        red:"#FF383C",
        blue:{
          500:"#0088FF",
          700:"#45539D"
        }
      },
    },
  },
  plugins: [],
}
