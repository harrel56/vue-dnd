module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', '@vue/airbnb', '@vue/typescript/recommended', 'eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['warn', { code: 140 }],
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],

  plugins: ['only-warn']
};
