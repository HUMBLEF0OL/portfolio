import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

// eslint-config-next 16 ships native flat configs (Linter.Config[]) under
// `./core-web-vitals` and `./typescript`, spread in directly. (Through v15 they
// were eslintrc-style and needed a FlatCompat bridge.)
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      'scripts/**',
      '**/.next/**',
      '**/node_modules/**',
      '.claude/**',
      'docs/**',
      'out/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      'next-env.d.ts',
    ],
  },
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-debugger': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'error',
      // New React-Compiler-era rules enabled by eslint-config-next 16. They flag
      // intentional, correct patterns here — browser-state sync in effects
      // (matchMedia/IntersectionObserver/rAF) and a state-mirroring ref read.
      // Kept as warnings (visible tech-debt) rather than failing the gate;
      // revisit with useSyncExternalStore if/when adopting the React Compiler.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
  {
    // Pages must stay Server Components — push 'use client' down to children.
    // Enforces CONSTRAINTS.md "MUST NOT add 'use client' to page.tsx" [auto].
    files: ['src/app/**/page.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "ExpressionStatement > Literal[value='use client']",
          message:
            "Do not add 'use client' to page.tsx — push interactivity down to child components (see CONSTRAINTS.md).",
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/__tests__/**'],
    rules: {
      'no-console': 'off',
    },
  },
]

export default eslintConfig
