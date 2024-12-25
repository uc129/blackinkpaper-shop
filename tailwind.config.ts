import { tofino } from "@/app/layout";
import { placeholder } from "@cloudinary/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        label: "var(--label-text)",
        input: "var(--input-text)",
        placeholder: "var(--placeholder-text)",
      },
      fontFamily: {
        tofino: 'var(--tofino)',
        ibm: 'var(--ibm-plex-sans)',
        ibmCondensed: 'var(--ibm-plex-sans-condensed)',
      }
    },
  },
  plugins: [],
} satisfies Config;


