import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#070707',
        secondary: '#141414',
        terciary: '#1f1f1f',
        accent: '#cccccc',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        jetbrains: ['var(--font-jetbrains)'],
        pixel: ['var(--font-pixel-operator)'],
      },
    },
  },
  plugins: [],
}

export default config