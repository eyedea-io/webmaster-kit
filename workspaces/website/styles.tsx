import {createGlobalStyle} from '@shared/utils/styled'
import {UI} from '@website/config'

export const GlobalCSS = createGlobalStyle`
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
