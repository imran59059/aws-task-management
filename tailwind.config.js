/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan your components for class names
    "./public/index.html"         // Include HTML if used
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          700: 'var(--color-primary-700)',
          500: 'var(--color-primary-500)',
          200: 'var(--color-primary-200)',
        },
      },
    },
  },
  plugins: [],
};
