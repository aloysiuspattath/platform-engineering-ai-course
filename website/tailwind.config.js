/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './theme.config.jsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a855f7',     /* neon-primary (Vibrant Purple) */
        accent: '#4facfe',      /* neon-purple (Cyan/Blue) */
        warning: '#f093fb',     /* neon-pink */
        danger: '#ef4444',      /* Standard red for errors */
        darkbg: '#0b0c10',      /* Techfliq background */
        darkcard: '#111217',    /* Techfliq card bg */
        darkborder: '#1f2129',  /* Techfliq border */
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
