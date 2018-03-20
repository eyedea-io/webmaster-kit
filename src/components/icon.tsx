import * as fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import * as React from 'react'

export interface Props {
  name: fontawesome.IconProp
  size?: fontawesome.SizeProp
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
