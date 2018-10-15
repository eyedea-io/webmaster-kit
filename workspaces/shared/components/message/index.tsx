import {Block} from '@shared/components/block'
import {Icon} from '@shared/components/icon'
import styled from '@shared/utils/styled'
import * as React from 'react'

export interface Props {
  variant: 'positive' | 'negative'
  content?: string
  children?: React.ReactChild
}

const StyledMessage = styled(Block).attrs({})<Props>`
  position: relative;
  min-height: 1em;
  line-height: 1em;
  padding: ${({theme}) => theme.spacing.xs};
  border-radius: ${({theme}) => theme.radius};
  font-size: 14px;
  display: flex;
  border: 1px solid  hsla(${({theme, variant = 'positive'}) => theme.colors[variant].hsla(.3)});

  > svg {
    height: 14px;
    vertical-align: top;
    position: relative;
    top: -.1em;
    margin-right: ${({theme}) => theme.spacing.xs};
    color: ${({theme, variant = 'positive'}) => theme.colors[variant].hex};
  }
`

export const Message = (props: Props) => props.children || props.content ? (
  <StyledMessage {...props}>
    <React.Fragment>
      <Icon
        variant="solid"
        name={props.variant === 'negative' ? 'times-circle' : 'check-circle'}
        />
      <div>
        {props.children || props.content}
      </div>
    </React.Fragment>
  </StyledMessage>
) : null
