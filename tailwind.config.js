/** @type {import('tailwindcss').Config} */
export default {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
  extend: {
   boxShadow: {
    'boxShadow1': 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
   },
  },
  screens: {
   '2xl': { 'max': '1535px' },
   '2xl2': { 'max': '1430px' },
   'xl2': { 'max': '1406px' },
   // => @media (max-width: 1535px) { ... }
   'xl3': { 'max': '1385px' },
   '1xl': { 'max': '1351px' },
   'xl': { 'max': '1279px' },
   // => @media (max-width: 1279px) { ... }
   
   'xl1': { 'max': '1170px' },
   'lg': { 'max': '1050px' },
   // => @media (max-width: 1023px) { ... }
   'lg1': { 'max': '900px' },
   'md': { 'max': '767px' },
   // => @media (max-width: 767px) { ... }

   'sm': { 'max': '639px' },
   'sm1': { 'max': '539px' },
   'sm2': { 'max': '330px' },
   'sm22': { 'max': '250px' },
   // 'sm2': { 'max': '300px' },
   // => @media (max-width: 639px) { ... }
  }
 },
 plugins: [],
}