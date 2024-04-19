/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        '-1': '-1',
        '1':'1'
      },
      margin: {
        '-2px': '-2px',
        '-10px': '-10px'
      },
      fontFamily:{
        'trattatello': ["Trattatello", "fantasy"],
        'jazz': ["Jazz LET", "fantasy"],
        'chalkduster': ['Chalkduster', 'fantasy']
      },
      animation: {
        slideIn: "slideIn .5s ease-in-out forwards var(--delay, 0) infinite"
      }
    },
  },
  plugins: [],
};
