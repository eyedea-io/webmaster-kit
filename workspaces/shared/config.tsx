import {color, spacing} from '@shared/utils/css-helpers'

export const APP_TITLE = 'Webmaster App'
export const SYNCANO_PROJECT_INSTANCE = process.env.SYNCANO_PROJECT_INSTANCE
export const UI = {
  contentWidth: '960px',
  spacing: spacing(32),
  radius: '5px',
  colors: {
    // Borders, lines, etc.
    ui: color('#d3d7e0'),
    primary: color('#494de4'),
    positive: color('#26c344'),
    negative: color('#db2828'),
    // Main text color
    default: color('#56687C'),
    // Meta text color
    meta: color('#999999'),
    // Icons color
    icon: color('#ccc'),
  },
}
