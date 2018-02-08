import * as React from 'react'
import {Label} from './label'
import {CSS} from '../constants'

export interface Props {
  short?: boolean
  id?: string
  label?: string
  name: string
  value: string
  onChange(event: any): void
}

export const Textarea = ({short, label, ...props}: Props) => {
  const wrapperClassName = `
    Textarea
    ${short ? 'Textarea--short' : ''}
  `

  const id = props.id || props.name

  return (
    <div className={wrapperClassName}>
      {label && (
        <div className="u-mb---">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
      <textarea id={id} {...props} />

      <style jsx>{`
        .Textarea {
          display: inline-block;
          width: 100%;
        }

        .Textarea--short {
          width: auto;
        }

        textarea {
          background-color: #f8f8f8;
          color: #999;
          padding: 14px ${CSS.spacing.sm};
          border-radius: ${CSS.radius};
          border: 1px solid ${CSS.colors.ui};
          font-family: inherit;
          transition: border-color 0.25s, box-shadow 0.25s;
          width: 100%;
          resize: none;
          vertical-align: top;
        }

        textarea.is-invalid {
          border-color: ${CSS.colors.negative};
        }

        textarea:focus {
          outline: 0;
          box-shadow: 0 1px 4px rgba(0,0,0, .1);
          border-color: ${CSS.colors.primary};
        }

        textarea::placeholder {
          color: #999;
        }
      `}</style>
    </div>
  )
}
