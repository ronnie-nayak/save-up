/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/core-web-vitals"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/require-await": "off",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "apps", "packages"],
};

module.exports = config;
