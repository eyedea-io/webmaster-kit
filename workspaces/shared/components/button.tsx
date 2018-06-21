import {UI} from '@shared/config'
import * as React from 'react'
import {Spinner} from './spinner'

export interface Props extends React.ButtonHTMLAttributes<{}> {
  variant?: 'primary' | 'positive' | 'negative'
  short?: boolean,
  loading?: boolean,
}

export const Button = ({
  variant = 'primary', children, className, short, loading, ...props
}: Props) => (
  <button
    className={`
      Button
      ${variant ? `Button--${variant}` : ''}
      ${className || ''}
    `}
    {...props}
  >
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
        color: hsl(0, 0%, 100%);
      }

      .Button:focus,
      .Button:hover {
        box-shadow: inset 0 0 100px 0 hsla(0, 0%, 100%, 0.2), 0 3px 6px 0 hsla(0, 0%, 0%, 0.2);
        transform: translateY(-1px)
      }

      .Button:active {
        box-shadow: inset 0 0 100px 0 hsla(0, 0%, 0%, 0.07);
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
        background-color: hsl(0, 0%, 96%);
        color: hsl(0, 0%, 73%);
        transform: none;
        box-shadow: none;
      }
    `}</style>
  </button>
)
