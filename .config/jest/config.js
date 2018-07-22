module.exports = {
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/file-mock.js",
    "@shared/(.*)": "<rootDir>/../../workspaces/shared/$1",
    "@website/(.*)": "<rootDir>/../../workspaces/website/$1"
  },
  "globals": {
    "ts-jest": {
      "useBabelrc": true,
      "tsConfigFile": "../../tsconfig.test.json"
    }
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "roots": [
    "../../"
  ],
  "transform": {
    "\\.(ts|tsx)$": "<rootDir>/../../node_modules/ts-jest/preprocessor.js"
  },
  "testMatch": [
    "**/workspaces/**/*.test.(ts|tsx|js)"
  ],
  "setupFiles": [
    "<rootDir>/setup-tests.js"
  ]
}
