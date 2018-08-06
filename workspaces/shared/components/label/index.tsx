import {Block} from '@shared/components/block'
import {hot} from 'react-hot-loader'

export const Label = hot(module)(
  Block.withComponent('label').extend`
    font-size: 14px;
    font-weight: 600;
    color: hsl(0, 0%, 20%);
    display: block;
    cursor: pointer;
  `
)

Label.displayName = 'Label'
