import type { Config } from "tailwindcss";

const config: Config = {
 darkMode: ["class", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        title: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        chatBg: "#0f0f13",
        sidebarBg: "#101014",
        accentPurple: "#9333ea",
      }
    },
  },
  plugins: [],
};

export default config;
