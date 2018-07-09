import {Label} from '@shared/components/label'
import styled from '@shared/utils/styled'
import {observer} from 'mobx-react'
import * as React from 'react'

export interface Props extends React.InputHTMLAttributes<{}> {
  short?: boolean
  label?: string
}

const StyledWrapper = styled.div.attrs({})<Props>`
  display: inline-block;
  width: ${({short}) => short ? 'auto' : '100%'};
`
const StyledInput = styled.input.attrs({})<Props>`
  background-color: hsl(0, 0%, 97%);
  color: hsl(0, 0%, 60%);
  box-shadow: none;
  padding: 14px 16px;
  border: 1px solid ${({theme}) => theme.colors.ui.hex};
  transition: border-color 0.25s, box-shadow 0.25s;
  border-radius: ${props => props.theme.radius[2]};
  width: 100%;

  &:focus {
    outline: 0;
    box-shadow: 0 1px 4px hsla(0, 0%, 0%, 0.1);
    border-color: ${props => props.theme.colors.primary.hex};
  }
  &::placeholder {
    color: hsl(0, 0%, 60%);
  }
`

@observer
export class Input extends React.Component<Props> {
  render() {
    const {label} = this.props
    const id = this.props.id || this.props.name

    return (
      <StyledWrapper short={this.props.short}>
        {label && (
          <div className="u-mb---">
            <Label htmlFor={id}>{label}</Label>
          </div>
        )}

        <StyledInput {...this.props} type={this.props.type || 'text'} id={id} />
      </StyledWrapper>
    )
  }
}
