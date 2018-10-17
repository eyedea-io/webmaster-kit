import * as Router from '@reach/router'
import {WithStore} from '@website/types'
import {inject} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

@inject('store')
@hot(module)
class Logout extends React.Component<WithStore> {
  componentDidMount() {
    this.props.store.userStore.logout()
    Router.navigate('/auth/login')
  }

  render () {
    return null
  }
}

export default Logout
