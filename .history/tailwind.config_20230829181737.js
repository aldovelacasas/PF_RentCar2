/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gris_fondo: "#dbdbdb",
        gris_frente: "#e9e9e9",
        negro_fondo: "#282828",
        naranja_enf: "#ea4f39",
        rojo_status: "#e30613",
        verde_status: "#4aaf4d",
        amarillo_status: "#f0e400",
      },
    },
  },
  plugins: [],
};
