import * as styledComponents from 'styled-components'
import {ThemedStyledComponentsModule} from 'styled-components'

export interface Color {
  rgba: (alpha: number) => string
  hsla: (alpha: number) => string
  hsl: string
  rgb: string
  hex: string
  toString: () => string
}

export interface Theme {
  breakpoints: number[]
  fontSizes: number[]
  fontWeights: number[]
  lineHeights: {
    solid: number
    title: number
    copy: number
  }
  letterSpacing: {
    normal: string
    tracked: string
    tight: string
    mega: string
  }
  fonts: {
    serif: string
    sansSerif: string
  }
  spacing: {
    xxs: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }
  widths: number[]
  heights: number[]
  radius: (number | string)[]
  colors: {
    ui: Color
    primary: Color
    positive: Color
    negative: Color
    default: Color
    meta: Color
    icon: Color
  }
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<Theme>

export {css, injectGlobal, keyframes, ThemeProvider}
export default styled
