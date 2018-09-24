import * as Router from '@reach/router'
import {WithStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

@inject('store')
@observer
@hot(module)
class Logout extends React.Component<WithStore> {
  componentDidMount() {
    this.props.store.userStore.logout()
    Router.redirectTo('/')
  }

  render () {
    return null
  }
}

export default Logout
