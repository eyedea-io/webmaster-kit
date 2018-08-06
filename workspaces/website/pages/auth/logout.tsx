import * as Router from '@reach/router'
import {Store} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

interface Props {
  store: Store
}

@inject('store')
@observer
@hot(module)
class Logout extends React.Component<Props> {
  componentDidMount() {
    this.props.store.userStore.logout()
    Router.redirectTo('/')
  }

  render () {
    return null
  }
}

export default Logout
