import {IconProp, SizeProp} from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import * as React from 'react'

export interface Props {
  name: IconProp
  size?: SizeProp
  solid?: boolean
  light?: boolean
  brands?: boolean
}

export const Icon = ({name, solid, brands, light, ...props}: Props) => (
  <FontAwesomeIcon
    icon={Array.isArray(name) ? name : [getType({solid, brands, light}), name]}
    {...props}
    />
)

function getType(props: {
  solid?: boolean
  light?: boolean
  brands?: boolean
}) {
  return props.light === true ? 'fal'
    : props.solid === true ? 'fas'
    : props.brands === true ? 'fab' : 'far'
  }

/**
 * @link https://fontawesome.com/how-to-use/js-component-packages
 */
import {library} from '@fortawesome/fontawesome'
const faCheckCircle = require('@fortawesome/fontawesome-free-regular/faCheckCircle')

library.add(faCheckCircle)
