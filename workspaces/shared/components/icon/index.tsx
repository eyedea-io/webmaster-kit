import {IconProp, SizeProp} from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import * as React from 'react'
import {hot} from 'react-hot-loader'

type FontVariant = 'regular' | 'solid' | 'light' | 'brands'

export interface Props {
  name: IconProp
  size?: SizeProp
  variant?: FontVariant
  fixedWidth?: boolean
}

export const Icon: React.SFC<Props> = hot(module)(
  ({name, variant, ...props}: Props) => (
    <FontAwesomeIcon
      icon={Array.isArray(name) ? name : [getType(variant), name]}
      {...props}
      />
  )
)

Icon.displayName = 'Icon'

function getType(variant: FontVariant) {
  return {
    regular: 'far',
    solid: 'fas',
    light: 'fal',
    brands: 'fab',
  }[variant] || 'far'
}

/**
 * @link https://fontawesome.com/how-to-use/js-component-packages
 */
import {library} from '@fortawesome/fontawesome'

const fabFacebookF = require('@fortawesome/fontawesome-free-brands/faFacebookF')

library.add(
  fabFacebookF
)
