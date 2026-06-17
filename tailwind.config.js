/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          lowest: '#ffffff',
          low: '#eff4ff',
          container: '#e5eeff',
          high: '#dce9ff',
          highest: '#d3e4fe',
          variant: '#d3e4fe',
          tint: '#525f75',
        },
        'on-surface': '#0b1c30',
        'on-surface-variant': '#44474c',
        'inverse-surface': '#213145',
        'inverse-on-surface': '#eaf1ff',
        outline: {
          DEFAULT: '#75777d',
          variant: '#c5c6cd',
        },
        primary: {
          DEFAULT: '#000000',
          container: '#0e1c2f',
          on: '#ffffff', // on-primary
        },
        secondary: {
          DEFAULT: '#006c49',
          container: '#9af2c5',
          on: '#ffffff', // on-secondary
        },
        tertiary: {
          DEFAULT: '#000000',
          container: '#002113',
          on: '#ffffff',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          on: '#ffffff',
        },
        background: '#f8f9ff',
        'on-background': '#0b1c30',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem', // 8px
        xs: '4px',
        sm: '0.25rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '20px', // generous 20px rounding from brand book
      },
      spacing: {
        xs: '4px',
        base: '8px',
        sm: '12px',
        gutter: '16px',
        md: '24px',
        lg: '40px',
        'container-margin': '24px',
      },
    },
  },
  plugins: [],
}
