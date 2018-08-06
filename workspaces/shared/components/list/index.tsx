import {Block} from '@shared/components/block'
import {UI} from '@shared/config'
import {css} from '@shared/utils/styled'

type Spacing = 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export interface Props {
  horizontal?: boolean,
  separated?: boolean,
  spacing?: Spacing
}

export const List = Block.extend.attrs({})<Props>`
  padding: 0;
  margin: 0;
  list-style-type: none;

  ${props => props.horizontal && css`
    display: flex;
    align-items: center;
  `}

  ${_ => !_.horizontal && css`& > * + * { margin-top: ${_.theme.spacing[_.spacing || 'md']} }`}
  ${_ => _.separated && css` & > * + * { padding-top: ${_.theme.spacing[_.spacing || 'md']} }`}
  ${_ => _.separated && !_.horizontal && css`& > * + * { border-top: 1px solid ${UI.colors.ui.hex} }`}
  ${_ => _.horizontal && css`& > * + * { margin-left: ${UI.spacing[_.spacing || 'md']} }`}
`

List.displayName = 'List'
