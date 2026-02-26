import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./sections/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        accent: "#f97316",
        muted: "#f3f4f6",
        border: "#e5e7eb"
      }
    }
  },
  plugins: []
};

export default config;
