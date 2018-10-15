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
  media: {
    desktop: any
    tablet: any
    tabletAndUp: any
    tabletAndDown: any
    phone: any
  }
  fontSizes: {
    giga: string
    mega: string
    kilo: string
    alpha: string
    beta: string
    gamma: string
    delta: string
    epsilon: string
    zeta: string
    milli: string
    micro: string
    nano: string
  }
  fontFamilies: {
    sansSerif: string
    serif: string
    code: string
    courier: string
    helvetica: string
    avenir: string
    athelas: string
    georgia: string
    times: string
    bodoni: string
    calisto: string
    garamond: string
    baskerville: string
  }
  lineHeights: {
    solid: number
    title: number
    copy: number
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
  radius: string
  colors: {
    ui: Color
    primary: Color
    positive: Color
    negative: Color
    default: Color
    meta: Color
    icon: Color
  }
  letterSpacing: {
    tracked: string
    tight: string
    mega: string
  }
}

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  createGlobalStyle,
} = styledComponents as ThemedStyledComponentsModule<Theme>

export {css, createGlobalStyle, keyframes, ThemeProvider}
export default styled
