import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  rules: {
    // Allow unused vars prefixed with _
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    // Relax some rules for design system components
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignores: ['dist/**', 'node_modules/**'],
})
