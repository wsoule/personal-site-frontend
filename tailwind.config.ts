import { type Config } from 'tailwindcss';

export default {
  content: [
    '{routes,islands,components}/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      primary: '#86efac',
      primaryStrong: '#82E5A6',
      primaryLight: '#C2FFD8',
    },
  },
  fontFamily: {
    // sans: ['Monorama-Regular', 'ui-sans-serif', 'system-ui'],
    // // Optionally, set other Monorama fonts for specific weights if needed
    // medium: ['Monorama-Medium', 'ui-sans-serif', 'system-ui'],
    // bold: ['Monorama-Bold', 'ui-sans-serif', 'system-ui'],
    // semibold: ['Monorama-SemiBold', 'ui-sans-serif', 'system-ui'],
  },
} satisfies Config;

// import { Options } from '$fresh/plugins/twind.ts';
// import * as colors from 'twind/colors';
//
// export default {
//   selfURL: import.meta.url,
//   theme: {
//     colors,
//     extend: {
//       colors: {
//         primary: '#e879f9',
//         primaryStrong: '#d946ef',
//         primaryLight: '#f0abfc',
//       },
//     },
//   },
//   preflight: (preflight, { theme: _theme }) => ({
//     ...preflight,
//     div: {
//       alignItems: 'center',
//     },
//     h1: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//     },
//     h2: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//     },
//     p: {
//       margin: '8px 0px 8px 0px',
//     },
//   }),
// } as Options;
