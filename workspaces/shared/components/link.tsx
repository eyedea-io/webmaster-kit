import {Link as RouterLink} from '@reach/router'
import {Block} from '@shared/components/block'
import {ROUTER_BASEPATH} from '@shared/config'
import styled from '@shared/utils/styled'
import * as React from 'react'

const StyledLink = styled(Block)`display: inline-block;`
export const Link = (props) => {
  const to = props.to ? `${ROUTER_BASEPATH}/${props.to.replace(/^\//, '')}` : props.to

  return (
    <StyledLink as={RouterLink} {...props} to={to} />
  )
}
