/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your folder structure
  ],
  darkMode: "class", // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        // Customize dark mode colors
        background: "#1a202c",
        primary: "#4A90E2",
      },
    },
    screens: {
      xs: "425px", 
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
