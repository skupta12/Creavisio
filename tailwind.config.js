/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#557AFF',
          200: '#F0F8FF',
        },
        dark: {
          200: '#101927',
          300: '#111f34',
          400: '#1a2945',
        }
      },
      fontFamily: {
        'sans': ['Arimo', 'Helvetica', 'sans-serif']
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: '1200px',
      },
      
      container: {
        center: true,
      },
    }
    
  },
}