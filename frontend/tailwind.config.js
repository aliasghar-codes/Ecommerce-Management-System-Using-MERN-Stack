/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "message-shadow": "0 0 1px rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
}

