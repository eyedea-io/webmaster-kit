import * as React from 'react'

export interface Props {
  children: React.ReactChild
  htmlFor: string
}

export const Label = ({children, htmlFor, ...props}: Props) => (
  <label className="Label" htmlFor={htmlFor} {...props}>
    {children}

    <style jsx>{`
      .Label {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        cursor: pointer;
      }
    `}</style>
  </label>
)
