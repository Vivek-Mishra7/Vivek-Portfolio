/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-paper': '#FAFAF8',
        'graphite-dark': '#1A1D23',
        'cyan-accent': '#06B6D4',
        'coral-accent': '#FB7A5C',
        'amber-accent': '#F59E0B',
        'slate-light': '#E4E4E1',
        'graphite-deep': '#12151C',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(26, 29, 35, 0.05), 0 2px 8px -1px rgba(26, 29, 35, 0.03)',
        'premium-hover': '0 12px 30px -4px rgba(26, 29, 35, 0.08), 0 4px 12px -2px rgba(26, 29, 35, 0.05)',
      }
    },
  },
  plugins: [],
}
