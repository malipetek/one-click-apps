/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E64A19',
          light: '#FF8A65',
          dark: '#BF360C',
          contrastText: '#FFFFFF',
          50: "#FDEDE8",
          100: "#FADBD1",
          200: "#F5B6A3",
          300: "#F09275",
          400: "#EB6D47",
          500: "#E64A19",
          600: "#B83A14",
          700: "#8A2C0F",
          800: "#5C1D0A",
          900: "#2E0F05",
          950: "#170702"
        },
      },
    },
  },
  plugins: [],
}

