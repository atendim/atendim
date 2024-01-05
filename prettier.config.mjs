/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  arrowParens: 'avoid'
};

export default config;
