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
        primary: '#0f172a',     /* Slate 900 */
        accent: '#3b82f6',      /* Blue 500 */
        warning: '#f59e0b',     /* Amber 500 */
        danger: '#ef4444',      /* Red 500 */
        darkbg: '#0f172a',      /* Slate 900 */
        darkcard: '#1e293b',    /* Slate 800 */
        darkborder: '#334155',  /* Slate 700 */
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
