import {Block} from '@shared/components/block'
import styled from '@shared/utils/styled'
import * as React from 'react'
import {hot} from 'react-hot-loader'

const StyledLabel = styled(Block)`
  font-size: 14px;
  font-weight: 600;
  color: hsl(0, 0%, 20%);
  display: block;
  cursor: pointer;
`

export const Label = hot(module)(
  (props) => <StyledLabel as="label" {...props} />
)
