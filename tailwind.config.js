/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          geist: ["var(--font-geist-sans)"],
          geistMono: ["var(--font-geist-mono)"],
        },
      },
    },
    plugins: [],
  };
  