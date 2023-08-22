module.exports = {
  env: {
    "es2021": true
  },
  parserOptions: {
    "ecmaVersion": "latest"
  },
  rules: {
    "semi": ["error", "always"],
    "no-extra-parens": ["warn"],
    "eqeqeq": ["error"],
    "no-unused-vars": ["warn"],
    "no-unreachable": ["error"],
    "no-unsafe-negation": ["error"],
    "no-unused-private-class-members": ["error"],
    "camelcase": ["error"],
    "max-params": ["error", 3],
    "no-trailing-spaces": ["error"],
    "array-callback-return": ["error", { "checkForEach": true }],
    "prefer-const": ["error"],
  }
};