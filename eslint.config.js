import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
  // 忽略 README.md
  ignores: ['**/*.md'],
})
