import {observer} from 'mobx-react'
import * as React from 'react'
const hoistNonReactStatics = require('hoist-non-react-statics')

export function defineAs(check: any) {
  return Handle => {
    if (!Handle.name) {
      return Component => {
        @observer
        class Composed extends React.Component {
          render() {
            const {props: p} = this

            return check(p) ? <Handle {...p} /> : <Component {...p} />
          }
        }

        return hoistNonReactStatics(Composed, Component)
      }
    }

    return hoistNonReactStatics((props) =>
      check(props) ? <Handle {...props} /> : null,
      Handle
    )
  }
}
