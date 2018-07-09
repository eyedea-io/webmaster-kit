import styled from '@shared/utils/styled'
import {observer} from 'mobx-react'
import * as React from 'react'

export interface Props extends React.InputHTMLAttributes<{}> {
  short?: boolean
  label?: string
}

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
    return (
      <StyledInput {...this.props}>
        {this.props.children}
      </StyledInput>
    )
  }
}

// export const Input = ({short, type = 'text', label, ...props}: Props) => {
//   const wrapperClassName = `
//     Input
//     ${short ? 'Input--short' : ''}
//   `

//   const id = props.id || props.name

//   return (
//     <div className={wrapperClassName}>
//       {label && (
//         <div className="u-mb---">
//           <Label htmlFor={id}>{label}</Label>
//         </div>
//       )}
//       <input type={type} id={id} {...props} />

//       <style jsx>{`
//         .Input {
//           display: inline-block;
//           width: 100%;
//         }

//         .Input--short {
//           width: auto;
//         }

//         input {
//           background-color: hsl(0, 0%, 97%);
//           color: hsl(0, 0%, 60%);
//           padding: 14px 16px;
//           border-radius: ${UI.radius};
//           border: 1px solid ${UI.colors.ui};
//           font-family: inherit;
//           transition: border-color 0.25s, box-shadow 0.25s;
//           width: 100%;
//         }

//         input.is-invalid {
//           border-color: ${UI.colors.negative};
//         }

//         input:focus {
//           outline: 0;
//           box-shadow: 0 1px 4px hsla(0, 0%, 0%, 0.1);
//           border-color: ${UI.colors.primary};
//         }

//         input::placeholder {
//           color: hsl(0, 0%, 60%);
//         }
//       `}</style>
//     </div>
//   )
// }
