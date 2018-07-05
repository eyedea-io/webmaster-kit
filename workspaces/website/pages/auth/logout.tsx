import {IStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router'

interface Props {
  store: IStore
}

@inject('store')
@observer
@hot(module)
class Logout extends React.Component<Props> {
  componentDidMount() {
    this.props.store.userStore.logout()
  }

  render () {
    return <Router.Redirect to="/" />
  }
}

export default Logout
