import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class", // next-themes support

  content: [
    "./src/**/*.{ts,tsx}", // if you're using `src/`
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // NOTE: No `extend.colors`, `keyframes`, or `animation` needed here
    // Those are now handled in your `globals.css` with @theme and @keyframes
  },
  plugins: [
    tailwindcssAnimate, // still works with @theme animations
  ],
};

export default config;
