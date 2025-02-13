/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgb(79, 104, 173)',
        homebg: '#84b3e070',
        hoverColor: '#98c7f370 ',
        button: 'rgba(243, 241, 241, 0.76)',
        buttonBorder: 'rgb(231, 229, 229)'
      }
    },
  },
  plugins: [],
}

