/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-orange': '0 0 15px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 165, 0, 0.4), 0 0 45px rgba(255, 165, 0, 0.2)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 1s infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%': {
                    boxShadow: '0 0 15px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 165, 0, 0.4), 0 0 45px rgba(255, 165, 0, 0.2)' 
                },
          '50% ': {
            boxShadow: '0 0 20px rgba(255, 165, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.6), 0 0 60px rgba(255, 165, 0, 0.4)'
          } , 
          '100%': {
                    boxShadow: '0 0 15px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 165, 0, 0.4), 0 0 45px rgba(255, 165, 0, 0.2)'
                  },
          },
      },
    },
  },
  plugins: [],
}