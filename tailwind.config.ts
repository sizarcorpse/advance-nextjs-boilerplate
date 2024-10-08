import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
import { shadcnPreset } from "./src/libs/shadcnPreset";

const config = {
  presets: [shadcnPreset],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
} satisfies Config;

export default withUt(config);
