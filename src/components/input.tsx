import * as React from 'react'
import {Label} from './label'
import {CSS} from '../constants'

export interface Props {
  short?: boolean
  type?: string
  id?: string
  label?: string
  name: string
  value: string
  onChange(event: any): void
}

export const Input = ({short, type = 'text', label, ...props}: Props) => {
  const wrapperClassName = `
    Input
    ${short ? 'Input--short' : ''}
  `

  const id = props.id || props.name

  return (
    <div className={wrapperClassName}>
      {label && (
        <div className="u-mb---">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
      <input type={type} id={id} {...props} />

      <style jsx>{`
        .Input {
          display: inline-block;
          width: 100%;
        }

        .Input--short {
          width: auto;
        }

        input {
          background-color: #f8f8f8;
          color: #999;
          padding: 14px 16px;
          border-radius: ${CSS.radius};
          border: 1px solid ${CSS.colors.ui};
          font-family: inherit;
          transition: border-color 0.25s, box-shadow 0.25s;
          width: 100%;
        }

        input.is-invalid {
          border-color: ${CSS.colors.negative};
        }

        input:focus {
          outline: 0;
          box-shadow: 0 1px 4px rgba(0,0,0, .1);
          border-color: ${CSS.colors.primary};
        }

        input::placeholder {
          color: #999;
        }
      `}</style>
    </div>
  )
}
