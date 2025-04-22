 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      width: {
        custom: 'clamp(30rem, 43cqi, 40%)',
        blog:'clamp(20rem, 27cqi, 28%)',
        headline:'clamp(1.5rem,1.8cqi,3rem)',
        locationInput: 'clamp(15rem, 14cq, 25rem)',
        createBlogButton:'clamp(15rem, 16cqi, 30rem)',
      },
    },
  },
  plugins: [],
}