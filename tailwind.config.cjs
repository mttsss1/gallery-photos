/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      padding: {
        'paddingone': '8px 16px'
      },
      margin: {
        'marginone': '0 20px',
        'margintwo': '10px auto 0 auto'
      }
    },
  },
  plugins: [],
}
