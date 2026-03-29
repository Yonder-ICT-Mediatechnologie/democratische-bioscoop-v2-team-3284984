/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base palette derived from the provided CSS variables
        primary: '#1C1F26', // background color
        secondary: '#494A4D', // secondary surfaces/cards
        dark: '#1A2340', // unused but retained for backward compatibility
        accent: '#3549E3', // primary accent colour
        accenthover: '#1C30C9', // darker accent for hover states
        success: '#00450C', // success state (e.g. reserved seats)
        danger: '#510000', // danger/error state
        light: '#f0f4fb',
        card: '#2d385b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};