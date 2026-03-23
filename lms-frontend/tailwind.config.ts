import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3358E2', // Indigo blue
        background: '#FAF9F6', // Off-white/paper
        surface: '#FFFFFF',
        'surface-low': '#F4F1EA',
        'on-surface': '#1C1A17',
        'on-surface-variant': '#595853',
      },
      borderRadius: {
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
