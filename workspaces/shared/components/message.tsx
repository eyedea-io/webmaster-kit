import styled from '@shared/utils/styled'
import * as React from 'react'

export interface Props {
  variant: 'positive' | 'negative'
  content?: string
  children?: React.ReactChild
}

const StyledMessage = styled.div.attrs({})<Props>`
  position: relative;
  min-height: 1em;
  line-height: 1em;
  padding: ${({theme}) => theme.spacing.sm};
  border-radius: ${({theme}) => theme.radius[2]};
  font-size: 14px;

  color: ${({theme, variant}) => theme.colors[variant].hex};
  background: hsla(${({theme, variant}) => theme.colors[variant].hsla(.3)});
  box-shadow: 0 0 0 1px hsl(${({theme, variant}) => theme.colors[variant].hsl}) inset, 0 0 0 0 transparent;
`

export const Message = (props: Props) => props.children || props.content ? (
  <StyledMessage {...props}>
    {props.children || props.content}
  </StyledMessage>
) : null
