import { FlatCompat } from '@eslint/eslintrc'

// next 15's eslint-config-next ships eslintrc-style shareable configs, not a
// flat-config array. FlatCompat bridges them into the flat config below.
const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
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
