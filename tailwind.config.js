import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const COLORS = require("./src/constants/colors").COLORS;
//const COLORS = await import("./src/colors.ts").then((m) => m.COLORS);
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}",
    "./index.html",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: COLORS.mainBlue,
        "main-gold": COLORS.mainGold,
        "dark-gold": COLORS.darkGold,
        "light-gold": COLORS.lightGold,
        "secondary-gold": COLORS.secondaryGold,
        "main-gray": COLORS.mainGray,
      },
      fontSize: {
        small: "0.7rem",
      },
    },
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
    georgia: ["Noto Sans Georgian"],
  },
  plugins: [require("daisyui"), flowbite.plugin()],
  daisyui: {
    base: false,
    themes: false,
    styled: true,
    darkTheme: "light",
  },
};
