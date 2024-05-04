import { type Config } from 'tailwindcss';

export default {
  content: [
    '{routes,islands,components}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Monorama-Regular', 'ui-sans-serif', 'system-ui'],
        // // Optionally, set other Monorama fonts for specific weights if needed
        // medium: ['Monorama-Medium', 'ui-sans-serif', 'system-ui'],
        // bold: ['Monorama-Bold', 'ui-sans-serif', 'system-ui'],
        // semibold: ['Monorama-SemiBold', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
} satisfies Config;
