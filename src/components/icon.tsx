import * as React from 'react'
import * as fontawesome from '@fortawesome/fontawesome'
const FontAwesomeIcon =  require('@fortawesome/react-fontawesome')

export interface Props {
  name: fontawesome.IconProp,
  size?: fontawesome.SizeProp,
  solid?: boolean
  light?: boolean
  brands?: boolean
}

export const Icon = ({name, ...props}: Props) => (
  <FontAwesomeIcon
    icon={Array.isArray(name) ? name : [getType(props), name]}
    {...props}
    />
)

function getType(props: any) {
  return 'light' in props
    ? 'fal'
    : 'solid' in props ? 'fas' : 'brands' in props ? 'fab' : 'far'
}
