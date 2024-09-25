import type { Config } from "tailwindcss";
import { shadcnPlugin } from "./shadcnPlugin";

export const shadcnPreset = {
  darkMode: ["class"],
  content: [],
  plugins: [
    shadcnPlugin,
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
