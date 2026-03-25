/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface-container-lowest': '#0E0E0E',
        'surface': '#131313',
        'surface-container-low': '#1B1B1B',
        'surface-container': '#1F1F1F',
        'surface-container-high': '#2A2A2A',
        'surface-container-highest': '#353535',
        'surface-bright': '#393939',
        'primary': '#FFFFFF',
        'on-primary': '#1A1C1C',
        'primary-container': '#D4D4D4',
        'on-surface': '#E2E2E2',
        'on-surface-variant': '#C6C6C6',
        'outline-variant': '#474747',
        'surface-tint': '#C6C6C7',
        'error': '#FFB4AB'
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '20': '5rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'ambient': '0 0 40px rgba(226, 226, 226, 0.08)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(45deg, #FFFFFF, #D4D4D4)',
      }
    },
  },
  plugins: [],
}
