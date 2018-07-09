import {color, spacing, toEm, toPx} from '@shared/utils/css-helpers'
import {Theme} from '@shared/utils/styled'

export const APP_TITLE = 'Webmaster App'
export const APP_LANG = 'EN'
export const SENTRY_URL = process.env.SENTRY_URL
export const TRACKJS_KEY = process.env.TRACKJS_KEY
export const LOCAL_STORAGE_KEY = process.env.LOCAL_STORAGE_KEY
export const SYNCANO_PROJECT_INSTANCE = process.env.SYNCANO_PROJECT_INSTANCE
export const UI: Theme = {
  breakpoints: toEm([32, 48, 64]),
  fontSizes: {
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
  fontWeights: toPx([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  letterSpacing: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em',
  },
  spacing: spacing(32),
  widths: toPx([16, 32, 64, 128, 256]),
  heights: toPx([16, 32, 64, 128, 256]),
  radius: toPx([0, 2, 4, 16, 9999, '100%']),
  colors: {
    ui: color('#d3d7e0'),
    primary: color('#494de4'),
    positive: color('#26c344'),
    negative: color('#db2828'),
    default: color('#56687C'),
    meta: color('#999999'),
    icon: color('#ccc'),
  },
}
