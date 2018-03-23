import {UI} from '@shared/config'
import * as React from 'react'

export interface Props {
  children: React.ReactChild | Array<React.ReactChild>
}

export const Wrapper = ({children}: Props) => (
  <div className={`Wrapper`}>
    {children}

    <style jsx>{`
      .Wrapper {
        max-width: ${UI.contentWidth};
        padding-left: ${UI.spacing.sm};
        padding-right: ${UI.spacing.sm};
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      }

      @media screen and (min-width: 769px) {
        .Wrapper {
          padding-left: ${UI.spacing};
          padding-right: ${UI.spacing};
        }
      }
    `}</style>
  </div>
)
