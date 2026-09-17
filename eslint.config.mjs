// Flat config. ESLint 10 dropped .eslintrc and Next 16 removed `next lint`, so
// `npm run lint` calls eslint directly and eslint-config-next is imported as
// the flat-config arrays it now ships.
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  // Last: turns off the stylistic rules Prettier already owns.
  prettier,
];

export default config;
