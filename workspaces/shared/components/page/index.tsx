import {UI} from '@shared/config'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {Normalize} from './normalize'
import {Spacing} from './spacing'
import {Typography} from './typography'
import {Widths} from './widths'

export interface Props {
  children?: React.ReactChild | Array<React.ReactChild>
}

@hot(module)
class Page extends React.Component<Props> {
  render() {
    return  (
      <React.Fragment>
        {this.props.children}

        <div>
          <Normalize />
          <Typography />
          <Spacing />
          <Widths />
          <style jsx global>{`
            html {
              color: ${UI.colors.default};
              font-size: 1em;
              line-height: 1.25;
              background: #fff;
              font-family: "Roboto", sans-serif;
            }

            body {
              overflow-y: scroll;
              overflow-x: hidden;
              min-height: 100vh;
            }
          `}</style>
        </div>
      </React.Fragment>
    )
  }
}

export {Page}
