/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}" 
    //pages,components 내 모든 파일, 확장자명이 해당 4개인 것에 적용
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
