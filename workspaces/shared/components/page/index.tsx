import {Normalize} from '@shared/components/page/normalize'
import {Spacing} from '@shared/components/page/spacing'
import {Typography} from '@shared/components/page/typography'
import {Widths} from '@shared/components/page/widths'
import {UI} from '@shared/config'
import * as React from 'react'
import {hot} from 'react-hot-loader'

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
              color: ${UI.colors.default.hex};
              font-size: 1em;
              line-height: 1.25;
              background: hsl(0, 0%, 100%);
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
