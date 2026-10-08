/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: '#0e0f11',
          surface: '#17181b',
          subtle: '#202226',
          border: '#2a2c31',
        },
        gitbutler: {
          orange: '#ff5533',
          coral: '#ff7a5c',
          hover: '#ff6a4d',
          teal: '#2ec4b6',
          purple: '#a78bfa',
          green: '#34c759',
          red: '#ff453a',
          amber: '#ffb340',
        },
        ink: {
          primary: '#f5f5f7',
          secondary: '#a1a1a6',
          muted: '#6e6e73',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
