import * as React from 'react'
import {IStore} from '../types'
import {observer} from 'mobx-react'
const hoistNonReactStatics = require('hoist-non-react-statics')

interface Props {
  store: IStore
}

export const as = {
  guest: defineAs(props => !props.store.userStore.isLoggedIn),
  member: defineAs(props => props.store.userStore.isLoggedIn),
  // admin: defineAs(props => props.store.userStore.isAdmin),
}

function defineAs(check: any) {
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

    return hoistNonReactStatics((props: Props) =>
      check(props) ? <Handle {...props} /> : null,
      Handle
    )
  }
}
