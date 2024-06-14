/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  tabWidth: 2,
  semi: false,
  printWidth: 80,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
