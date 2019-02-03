module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'typescript',
    'prettier'
  ],
  // add your custom rules here
  rules: {}
}
