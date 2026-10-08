import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

// Design tokens copied from sharepal.in's compiled stylesheet so class names
// like `text-sh5` or `bg-primary-900` mean exactly what they mean on the live site.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: { container: false }, // SharePal's container is a fixed 1216px column, defined in globals.css
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ubuntu: ['var(--font-ubuntu)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        d4: ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03rem', fontWeight: '700' }],
        d5: ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.025rem', fontWeight: '700' }],
        d6: ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02rem', fontWeight: '700' }],
        d7: ['1.5rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '2rem', fontWeight: '500' }],
        h4: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        h5: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        h6: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        h7: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        sh1: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        sh2: ['1rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        sh3: ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        sh4: ['0.875rem', { lineHeight: '1.125rem', fontWeight: '700' }],
        sh5: ['0.875rem', { lineHeight: '1.125rem', fontWeight: '600' }],
        sh6: ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }],
        sh7: ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
        b2: ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        b3: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        b4: ['0.875rem', { lineHeight: '1.125rem', fontWeight: '500' }],
        b5: ['0.875rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        b6: ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        b7: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        bt1: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        bt2: ['1rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        bt3: ['0.875rem', { lineHeight: '1rem', fontWeight: '600' }],
        bt4: ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
        o2: ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
        o3: ['0.625rem', { lineHeight: '0.875rem', fontWeight: '700' }],
        o4: ['0.625rem', { lineHeight: '0.875rem', fontWeight: '500' }],
      },
      colors: {
        page: '#F3F5F6',
        border: '#E2E8F0',
        'muted-foreground': '#64748B',
        primary: {
          100: '#E8ECFD', 150: '#D1DAFA', 200: '#BAC7F8', 250: '#A3B5F6', 300: '#758FF1', 400: '#476AED',
          500: '#1945E8', 600: '#1437BA', 700: '#0F298B', 800: '#0A1C5D', 850: '#081546', 900: '#030D31',
        },
        secondary: {
          100: '#F5FFE5', 150: '#ECFFCC', 200: '#E2FFB3', 250: '#D8FF99', 400: '#B1FF33', 500: '#9EFF00',
          600: '#91EA00', 700: '#7EC904', 800: '#6EB102', 850: '#2F4D00', 900: '#243A01',
        },
        neutral: {
          50: '#FAFAFA', 100: '#FBFBFB', 150: '#F4F6F7', 200: '#E2E7EA', 250: '#CCD2D5', 300: '#9C9FA8', 400: '#7D808D',
          500: '#5D6171', 600: '#4A4E5A', 700: '#383A44', 800: '#1C1D22', 850: '#131317', 900: '#090A0B', 950: '#0A0A0A',
        },
        gray: {
          50: '#F9FAFB', 100: '#FFFFFF', 150: '#F2F2F2', 200: '#E3E3E3', 300: '#A6A6A6', 400: '#979797', 500: '#898989',
          600: '#7A7A7A', 700: '#6B6B6B', 800: '#595959', 900: '#101010', 950: '#030712',
        },
        success: {
          100: '#E0F8EA', 150: '#C9F1D9', 200: '#B2EBC9', 300: '#6CD898', 400: '#3ECB77', 500: '#10BE56',
          600: '#0D9845', 700: '#0A7234', 800: '#064C22', 900: '#032210',
        },
        destructive: { 100: '#FEECEB', 500: '#F04438', 600: '#C0362D', DEFAULT: '#EF4444' },
        category: { purple: '#8A2BE2', green: '#228B22', orange: '#FF5733', red: '#FF4465' },
        decorative: { blue: '#0079BC', orange: '#E86419', pink: '#E819AE' },
        heading: '#020817',
      },
      borderRadius: { '4xl': '1.75rem' },
      backgroundImage: {
        'gaming-hero': 'linear-gradient(360deg, #8A2BE2 0%, #4C187C 100%)',
        'review-gradient': 'linear-gradient(92deg, #002CD1 27.44%, #1945E8 48.86%, #7EC904 70.28%)',
        'footer-logo': 'linear-gradient(90deg, #030D31, #03134F)',
        'save-more-text': 'linear-gradient(90deg, #F3FF6A, #B5DCB7)',
      },
      boxShadow: {
        sidebar: '0 2px 15px rgba(0, 0, 0, 0.06)',
        logo: '0 0 8px rgba(0, 0, 0, 0.05), 0 0 16px 1px rgba(0, 0, 0, 0.1)',
        modal: '0 0 14px rgba(0, 0, 0, 0.12), 0 0 16px 1px rgba(0, 0, 0, 0.16)',
      },
      keyframes: {
        'marquee-horizontal': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'pill-in': { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'marquee-horizontal': 'marquee-horizontal var(--duration, 40s) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pill-in': 'pill-in 0.3s ease-out',
      },
    },
  },
  plugins: [animate],
};

export default config;
