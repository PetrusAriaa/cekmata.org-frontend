const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "neutral-000": "#ffffff",
        "neutral-50": "#f6f6f6",
        "neutral-100": "#eeeeee",
        "neutral-300": "#bbbfc8",
        "neutral-500": "#7f838e",
        "neutral-700": "#4f525b",
        "neutral-900": "#242730",
        "neutral-1000": "#0e111a",

        "extra-neutral-100": "#181c25",
        "extra-neutral-200": "#1e222a",
        "extra-neutral-300": "#2f323b",
        "extra-neutral-400": "#20232c",
        
        "blue-x-100": "#dae6fd",
        "blue-x-200": "#b6cdfc",
        "blue-x-400": "#6d9af9",
        "blue-x-500": "#4881f7",
        "blue-x-800": "#1d3870",
        "blue-x-900": "#0f2043",
        "blue-x-1000": "#010816",

        "blue-y-400": "#5885f0",
        "blue-y-500": "#2e67ec",
        "blue-y-600": "#2552bd",
        "blue-y-900": "#09152f",
        "blue-y-950": "#050a18",

        "blue-z-500": "#163bbb",
        "blue-z-600": "#122f93",
        "blue-z-700": "#0d236e",
        "blue-z-850": "#071237",

        "error-500": "#ff4d4f"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
