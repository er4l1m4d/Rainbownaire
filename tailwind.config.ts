import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rainbow: {
          50: '#fff0e6',
          100: '#ffe0cc',
          200: '#ffb399',
          300: '#ff8566',
          400: '#ff5733',
          500: '#e6331a',
          600: '#cc2900',
          700: '#991f00',
          800: '#661500',
          900: '#330a00',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        'gradient-rainbow-light': 'linear-gradient(135deg, #667eea20 0%, #764ba220 25%, #f093fb20 50%, #f5576c20 75%, #4facfe20 100%)',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-rainbow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};
export default config;