/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'default-bg': "url('/background.png')",
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

