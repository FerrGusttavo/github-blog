/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#3294F8',
        'base-title': '#E7EDF4',
        'base-subtitle': '#C4D4E3',
        'base-text': '#AFC2D4',
        'base-span': '#7B96B2',
        'base-label': '#3A536B',
        'base-border': '#1C2F41',
        'base-post': '#112131',
        'base-profile': '#0B1B2B',
        'base-background': '#071422',
        'base-input': '#040F1A',
      },
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'header-pattern': 'url("/effect.png")',
        'header-pattern-2': 'url("/effect2.png")',
      },
      boxShadow: {
        'pattern': '0px 2px 28px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}

