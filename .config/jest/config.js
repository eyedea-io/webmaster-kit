module.exports = {
  "rootDir": "../../",
  "testURL": "http://localhost:8080/",
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/file-mock.js",
    "@shared/(.*)": "<rootDir>/workspaces/shared/$1",
    "@website/(.*)": "<rootDir>/workspaces/website/$1"
  },
  "globals": {
    "ts-jest": {
      "babelConfig": true,
      "tsConfig": "tsconfig.test.json"
    }
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "\\.(ts|tsx)$": "ts-jest"
  },
  "collectCoverage": true,
  "coverageDirectory": "./.coverage/",
  "collectCoverageFrom": [
    "workspaces/**/*.{tsx}"
  ],
  "testMatch": [
    "<rootDir>/workspaces/**/*.test.(ts|tsx|js)"
  ],
  "setupFiles": [
    "<rootDir>/.config/jest/setup-tests.js"
  ]
}
