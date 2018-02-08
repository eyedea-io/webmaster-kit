import * as React from 'react'
import {Normalize} from './normalize'
import {Typography} from './typography'
import {Spacing} from './spacing'
import {Widths} from './widths'

interface Props {
  children?: React.ReactChild | Array<React.ReactChild>
}

export const Page = ({children}: Props) => (
  <React.Fragment>
    {children}

    <Normalize />
    <Typography />
    <Spacing />
    <Widths />

    <style jsx global>{`
      html {
        color: #171b21;
        font-size: 1em;
        line-height: 1.25;
        background: #e6eced;
        font-family: "Roboto", sans-serif;
      }

      body {
        min-height: 100vh;
      }
    `}</style>
  </React.Fragment>
)
