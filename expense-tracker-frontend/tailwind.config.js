/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#2ECC71',
        'background-light': '#F3F4F6',
        'card-light': '#FFFFFF',
        'text-light': '#1F2937',
        'subtext-light': '#6B7280',
        'primary-dark': '#2ECC71',
        'background-dark': '#111827',
        'card-dark': '#1F2937',
        'text-dark': '#F9FAFB',
        'subtext-dark': '#9CA3AF',
        'sidebar-dark': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

