module.exports = {
  rules: {
    "no-empty": "warn",
    "no-cond-assign": ["error", "always"],
  },
  extends: ["eslint:recommended",
    "plugin: prettier/recommended"
  ],
  env: {
    browser: true, // 브라우저 환경에서 작동할 것임을 명시.
    // `window` 나 `document` 와 같은 글로벌 함수를 사용할 때 오류가 뜨지 않게 해줌
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "parser": "@typescript-eslint/parser"
}
