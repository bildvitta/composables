import eslintLove from 'eslint-config-love'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'vite.config.ts', 'src/vite-env.d.ts', 'eslint.config.js']
  },
  {
    ...eslintLove,
    files: ['**/*.ts', '**/*.js'],
    rules: {
      ...eslintLove.rules,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
]
