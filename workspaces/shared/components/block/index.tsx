import styled, {css} from '@shared/utils/styled'
import {
  AlignItemsProperty,
  JustifyContentProperty,
  PositionProperty,
  TextAlignProperty
} from 'csstype'

type FontSize = 'giga' | 'mega' | 'kilo' | 'alpha' | 'beta' | 'gamma' | 'delta' |
  'epsilon' | 'zeta' | 'milli' | 'micro' | 'nano'
type FontFamily = 'sansSerif' | 'serif' | 'code' | 'courier' | 'helvetica' | 'avenir' |
  'athelas' | 'georgia' | 'times' | 'bodoni' | 'calisto' | 'garamond' | 'baskerville'
type AlignSelf = 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' |
  'start' | 'auto' | 'baseline' | 'normal' | 'stretch'
type FontStyle = 'normal' | 'italic'
type TextDecoration = 'line-through' | 'overline' | 'underline' | 'none'
type TextTransform = 'capitalize' | 'lowercase' | 'uppercase' | 'none'
type LineHeight = 'solid' | 'title' | 'copy'
type LetterSpacing = 'tracked' | 'tight' | 'mega'
type FontWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type Size = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
type VerticalAlign = 'baseline' | 'middle' | 'top' | 'bottom'

export interface Props {
  ls?: LetterSpacing
  fs?: FontStyle
  ff?: FontFamily
  fw?: FontWeight
  lh?: LineHeight
  fz?: FontSize
  pos?: PositionProperty
  tt?: TextTransform
  ta?: TextAlignProperty
  td?: TextDecoration
  va?: VerticalAlign

  // Paddings
  /**
   *
   *
   * @type {Size}
   * @memberof Props
   */
  p?: Size
  pl?: Size
  pr?: Size
  pb?: Size
  pt?: Size
  pv?: Size
  ph?: Size

  // Margins
  m?: Size
  ml?: Size | 'auto'
  mr?: Size | 'auto'
  mb?: Size
  mt?: Size
  mv?: Size
  mh?: Size | 'auto'

  // Negative margins
  nm?: Size
  nml?: Size
  nmr?: Size
  nmb?: Size
  nmt?: Size
  nmv?: Size
  nmh?: Size

  layout?: boolean
  inline?: boolean
  centered?: boolean
  flex?: boolean
  horizontal?: boolean
  vertical?: boolean
  reverse?: boolean
  alignItems?: AlignItemsProperty
  alignSelf?: AlignSelf
  justifyContent?: JustifyContentProperty

  // Width and height
  s?: string
  // Height
  h?: string
  // Width
  w?: string
  nowrap?: boolean
  truncate?: boolean
}

/**
 * @param props.p String
 */
export const Block = styled.div.attrs({})<Props>`
  /* Widths */
  ${_ => (_.w || _.s) && css`width: ${parseLength(_.w || _.s)};`}

  /* Heights */
  ${_ => (_.h || _.s) && css`height: ${parseLength(_.h || _.s)};`}

  /* Vertical align */
  ${_ => _.va && css`vertical-align: ${_.va} !important;`}

  /* Text transform */
  ${_ => _.tt && css`text-transform: ${_.tt} !important;`}

  /* Text decoration */
  ${_ => _.td && css`text-decoration: ${_.td} !important;`}

  /* Text align */
  ${_ => _.ta && css`text-align: ${_.ta} !important;`}

  /* Position */
  ${_ => _.pos && css`position: ${_.pos} !important;`}

  /* Letter spacing */
  ${_ => _.ls && css`letter-spacing: ${_.theme.letterSpacing[_.ls]} !important;`}

  /* Font weight */
  ${_ => _.fw && css`font-weight: ${_.fw} !important;`}

  /* Font style */
  ${_ => _.fs && css`font-style: ${_.fs} !important;`}

  /* Font family */
  ${_ => _.ff && css`font-family: ${_.theme.fontFamilies[_.ff]} !important;`}

  /* Font sizes */
  ${_ => _.fz && css`font-size: ${_.theme.fontSizes[_.fz]} !important;`}

  /* Line height */
  ${_ => _.lh && css`line-height: ${_.theme.lineHeights[_.lh]} !important;`}

  /* Paddings */
  ${_ => _.p && css`padding: ${_.theme.spacing[_.p]} !important;`}
  ${_ => (_.pl || _.ph) && css`padding-left: ${_.theme.spacing[_.pl || _.ph]} !important;`}
  ${_ => (_.pr || _.ph) && css`padding-right: ${_.theme.spacing[_.pr || _.ph]} !important;`}
  ${_ => (_.pb || _.pv) && css`padding-bottom: ${_.theme.spacing[_.pb || _.pv]} !important;`}
  ${_ => (_.pt || _.pv) && css`padding-top: ${_.theme.spacing[_.pt || _.pv]} !important;`}

  /* Margins */
  ${_ => _.m && css`margin: ${_.theme.spacing[_.m]} !important;`}
  ${_ => (_.ml || _.mh) && css`margin-left: ${_.theme.spacing[_.ml || _.mh] || 'auto'} !important;`}
  ${_ => (_.mr || _.mh) && css`margin-right: ${_.theme.spacing[_.mr || _.mh] || 'auto'} !important;`}
  ${_ => (_.mb || _.mv) && css`margin-bottom: ${_.theme.spacing[_.mb || _.mv]} !important;`}
  ${_ => (_.mt || _.mv) && css`margin-top: ${_.theme.spacing[_.mt || _.mv]} !important;`}

  /* Negative margins */
  ${_ => _.nm && css`margin: ${_.theme.spacing[_.nm] * -1} !important;`}
  ${_ => (_.nml || _.nmh) && css`margin-left: ${parseInt(_.theme.spacing[_.nml || _.nmh], 10) * -1}px !important;`}
  ${_ => (_.nmr || _.nmh) && css`margin-right: ${parseInt(_.theme.spacing[_.nmr || _.nmh], 10) * -1}px !important;`}
  ${_ => (_.nmb || _.nmv) && css`margin-bottom: ${parseInt(_.theme.spacing[_.nmb || _.nmv], 10) * -1}px !important;`}
  ${_ => (_.nmt || _.nmv) && css`margin-top: ${parseInt(_.theme.spacing[_.nmt || _.nmv], 10) * -1}px !important;`}

  /* Truncate */
  ${_ => _.truncate && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}

  /* No wrap */
  ${_ => _.nowrap && css`white-space: nowrap;`}

  /* Flex */
  ${_ => _.layout && css`display: flex;`}
  ${_ => _.flex && css`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  `}
  ${_ => _.centered && css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
  ${_ => _.horizontal && !_.reverse && css`flex-direction: row !important;`}
  ${_ => _.horizontal && _.reverse && css`flex-direction: row-reverse !important;`}
  ${_ => _.vertical && !_.reverse && css`flex-direction: column !important;`}
  ${_ => _.vertical && _.reverse && css`flex-direction: column-reverse !important;`}
  ${_ => _.alignItems && css`align-items: ${_.alignItems} !important;`}
  ${_ => _.alignSelf && css`align-self: ${_.alignSelf} !important;`}
  ${_ => _.justifyContent && css`justify-content: ${_.justifyContent} !important;`}
`

function parseLength(str: string) {
  if (/\//.test(str)) {
    const [a, b] = str.split('/')

    return `${parseInt(a, 10) / parseInt(b, 10) * 100}%`
  }

  return str
}
