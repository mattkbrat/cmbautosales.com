import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    "colors": {
      "primary": {
        50: "#EDF1FC",
        100: "#D7E0F9",
        200: "#B4C4F3",
        300: "#8CA5ED",
        400: "#6989E7",
        500: "#4169E1",
        600: "#204BCB",
        700: "#183796",
        800: "#102565",
        900: "#081230",
        950: "#040A1A"
      },
      "secondary": {
        50: "#FCE7D4",
        100: "#F9CEAA",
        200: "#F29E54",
        300: "#DF7111",
        400: "#8A460A",
        500: "#351B04",
        600: "#2B1603",
        700: "#211102",
        800: "#130A01",
        900: "#090501",
        950: "#050200"
      },
      "tertiary": {
        50: "#E8E8E3",
        100: "#D3D3CA",
        200: "#A8A894",
        300: "#767660",
        400: "#414135",
        500: "#0B0B09",
        600: "#080807",
        700: "#060605",
        800: "#060605",
        900: "#030302",
        950: "#000000"
      },
      "surface": {
        50: "#FCFDFD",
        100: "#FCFDFD",
        200: "#F5F9F9",
        300: "#F2F7F8",
        400: "#EBF3F4",
        500: "#E8F1F2",
        600: "#AACBCF",
        700: "#70A8AE",
        800: "#447379",
        900: "#233B3E",
        950: "#111C1D"
      }

    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
