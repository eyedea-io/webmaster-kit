import {color, media, spacing} from '@shared/utils/css-helpers'
import {Theme} from '@shared/utils/styled'

export const WORKSPACE_TITLE = process.env.WORKSPACE_TITLE || 'Webmaster App'
export const WORKSPACE_LANG = process.env.WORKSPACE_LANG || 'EN'
export const SENTRY_DSN = process.env.SENTRY_DSN
export const RELEASE = process.env.RELEASE
export const NODE_ENV = process.env.NODE_ENV
export const TRACKJS_KEY = process.env.TRACKJS_KEY
export const LOCAL_STORAGE_KEY = process.env.LOCAL_STORAGE_KEY
export const SYNCANO_PROJECT_INSTANCE = process.env.SYNCANO_PROJECT_INSTANCE
export const ROUTER_BASEPATH = process.env.ROUTER_BASEPATH || ''
export const UI: Theme = {
  spacing: spacing(8),
  radius: '5px',
  media: {
    desktop: media(769),
    tablet: media(567, 768),
    tabletAndUp: media(567),
    tabletAndDown: media(0, 768),
    phone: media(0, 576),
  },
  fontSizes: {
    giga: '64px',
    mega: '48px',
    kilo: '40px',
    alpha: '32px',
    beta: '28px',
    gamma: '24px',
    delta: '20px',
    epsilon: '18px',
    zeta: '16px',
    milli: '14px',
    micro: '13px',
    nano: '12px',
  },
  colors: {
    ui: color('#d3d7e0'),
    primary: color('#494de4'),
    positive: color('#26c344'),
    negative: color('#db2828'),
    default: color('#56687C'),
    meta: color('#999999'),
    icon: color('#ccc'),
  },
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  fontFamilies: {
    sansSerif: `-apple-system, BlinkMacSystemFont, 'avenir next', avenir,
      'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif
    `,
    serif: `georgia, times, serif`,
    code: `Consolas, monaco, monospace`,
    courier: `'Courier Next', courier, monospace`,
    helvetica: `'helvetica neue', helvetica, sans-serif`,
    avenir: `'avenir next', avenir, sans-serif`,
    athelas: `athelas, georgia, serif`,
    georgia: `georgia, serif`,
    times: `times, serif`,
    bodoni: `"Bodoni MT", serif`,
    calisto: `"Calisto MT", serif`,
    garamond: `garamond, serif`,
    baskerville : `baskerville , serif`,
  },
  letterSpacing: {
    tracked: '.1em',
    tight: '.05em',
    mega: '.25em',
  },
}
