module.exports = () => {
  // return {
  //   "presets": [
  //     ["@babel/preset-env", {
  //       useBuiltIns: 'entry',
  //       "modules": false,
  //       exclude: ['transform-typeof-symbol'],
  //     }],
  //     "@babel/preset-react",
  //     "@babel/preset-typescript",
  //   ],
  //   "plugins": [
  //     ["@babel/plugin-proposal-class-properties", {
  //       "loose": true
  //     }],
  //     ["@babel/plugin-proposal-decorators", false],
  //     "@babel/plugin-proposal-export-default-from",
  //     "@babel/plugin-proposal-export-namespace-from",
  //     ["@babel/plugin-proposal-object-rest-spread", {
  //       useBuiltIns: true,
  //     }],
  //     "@babel/plugin-syntax-dynamic-import",
  //     ["@babel/plugin-transform-runtime", {
  //       corejs: false,
  //       "helpers": true,
  //       "regenerator": true,
  //       "useESModules": true,
  //     }],
  //     [
  //       "@babel/plugin-transform-destructuring",
  //       {
  //         loose: false,
  //         selectiveLoose: [
  //           'useState',
  //           'useEffect',
  //           'useContext',
  //           'useReducer',
  //           'useCallback',
  //           'useMemo',
  //           'useRef',
  //           'useImperativeHandle',
  //           'useLayoutEffect',
  //           'useDebugValue',
  //         ],
  //       },
  //     ],
  //   ],
  //   "env": {
  //     "development": {
  //       "presets": [
  //         ["@babel/preset-env", {
  //           useBuiltIns: 'entry',
  //           "modules": false,
  //           exclude: ['transform-typeof-symbol'],
  //         }],
  //         ["@babel/preset-react", {
  //           development: true,
  //           useBuiltIns: true,
  //         }],
  //         "@babel/preset-typescript",
  //       ],
  //       "plugins": [
  //         ["babel-plugin-styled-components", {
  //           "displayName": true,
  //           "fileName": false
  //         }]
  //       ]
  //     },
  //     "test": {
  //       "presets": [
  //         "@babel/preset-env",
  //         "@babel/preset-typescript",
  //         "@babel/preset-react"
  //       ],
  //       "plugins": [
  //         "transform-runtime",
  //         "transform-es2015-modules-commonjs"
  //       ]
  //     }
  //   }
  // }
}
