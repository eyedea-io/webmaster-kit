import * as React from 'react'
import {CSS} from '../constants'

interface Props {
  children: React.ReactChild | Array<React.ReactChild>
}

export const Wrapper = ({children}: Props) => (
  <div className={`Wrapper`}>
    {children}

    <style jsx>{`
      .Wrapper {
        max-width: ${CSS.contentWidth};
        padding-left: ${CSS.spacing.sm};
        padding-right: ${CSS.spacing.sm};
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      }

      @media screen and (min-width: 769px) {
        .Wrapper {
          padding-left: ${CSS.spacing};
          padding-right: ${CSS.spacing};
        }
      }
    `}</style>
  </div>
)
