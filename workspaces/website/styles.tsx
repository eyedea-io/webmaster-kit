import {createGlobalStyle} from 'styled-components'
import {NormalizeCSS} from '@shared/utils/normalize-css'

export const GlobalCSS = createGlobalStyle`
  ${NormalizeCSS};

  html {
    font-size: 1em;
    line-height: 1.25;
    background: hsl(0, 0%, 100%);
    font-family: SF UI Text,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  }

  body {
    overflow-y: scroll;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
