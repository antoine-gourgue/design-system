import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  rules: {
    // Allow unused vars/args prefixed with _ or matching common emit param patterns
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_|^e$|^val$|^value$|^files$|^message$|^step$|^page$|^key$|^row$|^id$',
      varsIgnorePattern: '^_',
    }],

    // Vue template style — too noisy for a design system (intentional compact HTML)
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',

    // Allow self-closing void elements (<input />) — common in Vue templates
    'vue/html-self-closing': ['warn', {
      html: { void: 'any', normal: 'never', component: 'always' },
      svg: 'always',
      math: 'always',
    }],

    // Allow multiple template roots (slots/fragments)
    'vue/no-multiple-template-root': 'off',

    // Allow explicit any in design system utility types
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignores: ['dist/**', 'node_modules/**'],
})
