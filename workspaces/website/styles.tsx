import {UI} from '@shared/config'
import {injectGlobal} from '@shared/utils/styled'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  html {
    color: ${UI.colors.default.hex};
    font-size: 1em;
    line-height: 1.25;
    background: hsl(0, 0%, 100%);
    font-family: Roboto, sans-serif;
  }

  body {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  a {
    color: ${UI.colors.primary.hex};
    cursor: pointer;
    text-decoration: none;
  }

  h1 {
    color: #333;
    font-weight: 300;
  }
`
