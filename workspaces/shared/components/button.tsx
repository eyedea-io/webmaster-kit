import {UI} from '@shared/config'
import * as React from 'react'
import {Spinner} from './spinner'

export interface Props {
  children: React.ReactChild | string,
  primary?: boolean,
  positive?: boolean,
  negative?: boolean,
  short?: boolean,
  disabled?: boolean,
  onClick?: any,
  loading?: boolean,
  className?: string
}

export const Button = ({
  children, primary, positive, negative, className, short, loading, ...props
}: Props) => {
  const buttonClassName = `
    Button
    ${primary ? 'Button--primary' : ''}
    ${positive ? 'Button--positive' : ''}
    ${negative ? 'Button--negative' : ''}
    ${className}
  `

  return (
    <button className={buttonClassName} {...props}>
      {loading ? <Spinner white small /> : children}

      <style jsx>{`
        .Button {
          font-family: inherit;
          display: inline-block;
          border-radius: ${UI.radius};
          font-weight: bold;
          border: 0;
          padding: 15px 24px;
          cursor: pointer;
          transition-property: transform, box-shadow, background;
          transition-duration: 0.25s;
          width: ${short ? 'auto' : '100%'};
          font-weight: 600;
          letter-spacing: .02em;
          color: #fff;
        }

        .Button :global(svg) {
          margin-top: -1px;
          margin-right: 8px;
        }

        .Button:focus,
        .Button:hover {
          box-shadow: inset 0 0 100px 0 rgba(255, 255, 255, 0.2), 0 3px 6px 0 rgba(0, 0, 0, .2);
          transform: translateY(-1px)
        }

        .Button:active {
          box-shadow: inset 0 0 100px 0 rgba(0, 0, 0, 0.07);
          transform: translateY(1px);
        }

        .Button:focus {
          outline: 0;
        }

        /**
         * Button - PRIMARY
         */
        .Button--primary {
          background: ${UI.colors.primary};
        }

        /**
         * Button - POSITIVE
         */
        .Button--positive {
          background: ${UI.colors.positive};
        }

        /**
         * Button - NEGATIVE
         */
        .Button--negative {
          background: ${UI.colors.negative};
        }

        /**
         * Button - DISABLED
         */
        .Button[disabled],
        .Button[disabled]:focus,
        .Button[disabled]:hover,
        .Button[disabled]:active {
          background-color: #f5f5f5;
          color: #bbb;
          transform: none;
          box-shadow: none;
        }
      `}</style>
    </button>
  )
}
