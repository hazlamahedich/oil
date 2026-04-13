import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        panel: 'var(--bg-panel)',
        structural: 'var(--border-structural)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent-amber': 'var(--warning)',
        'accent-cyan': 'var(--cyan)',
        'severity-critical': 'var(--severity-critical)',
        'severity-warning': 'var(--severity-warning)',
        'severity-elevated': 'var(--severity-elevated)',
        'severity-normal': 'var(--severity-normal)',
        info: 'var(--info)',
        success: 'var(--success)',
        accent: 'var(--accent)',
        purple: 'var(--purple)',
        'text-on-critical': 'var(--text-on-critical)',
        'text-on-warning': 'var(--text-on-warning)',
        'text-on-elevated': 'var(--text-on-elevated)',
        'text-on-stable': 'var(--text-on-stable)',
        'text-on-accent-amber': 'var(--text-on-accent-amber)',
        'text-on-accent-cyan': 'var(--text-on-accent-cyan)',
        'text-disabled': 'var(--text-disabled)',
        'surface-hover': 'var(--surface-hover)',
        'surface-active': 'var(--surface-active)',
        'focus-ring-color': 'var(--focus-ring-color)',
        'skeleton-pulse': 'var(--skeleton-pulse)',
        'surface-focus': 'var(--surface-focus)',
        overlay: 'var(--overlay-backdrop)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        panel: 'var(--shadow-panel)',
        elevated: 'var(--shadow-elevated)',
      },
      animation: {
        'pulse-heartbeat': 'pulse-heartbeat 2s ease-in-out infinite',
        'shimmer-refresh': 'shimmer-refresh 1.5s linear infinite',
        'flash-severity': 'flash-severity 400ms ease-out',
        'expand-alert': 'expand-alert 3s ease-out',
        'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-heartbeat': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'shimmer-refresh': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'flash-severity': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.2' },
          '100%': { opacity: '1' },
        },
        'expand-alert': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '200px', opacity: '1' },
        },
        'skeleton-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
