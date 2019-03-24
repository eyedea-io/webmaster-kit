import {createGlobalStyle} from 'styled-components'

export const GlobalCSS = createGlobalStyle`
  html {
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
    cursor: pointer;
    text-decoration: none;
  }

  h1 {
    color: #333;
    font-weight: 300;
  }
`
