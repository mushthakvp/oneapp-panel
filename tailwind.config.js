/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        buttonColor: "#1c1c84",
        inputBorder: "#ECEBE5",
       nonActiveColor:'#1c1c840f',
        naveBorder: "#EAEAEA",
        containerWhite: "#FFFFFF",
      },
      fontFamily: {
        jersey: ["Jersey", "sans-serif"], // Add Jersey font
        urbanist: ["Urbanist", "sans-serif"], // Add Urbanist font
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [],
};

