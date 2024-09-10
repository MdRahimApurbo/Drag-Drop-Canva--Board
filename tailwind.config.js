/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#d97706",
        mainBackground: "#0D1117",
        columnBackground: "#161B22",
      },
    },
  },
  plugins: [],
};
