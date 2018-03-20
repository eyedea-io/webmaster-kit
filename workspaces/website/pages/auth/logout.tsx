import {inject, observer} from '@shared/utils'
import {IStore} from '@types'
import * as React from 'react'
import * as Router from 'react-router'

interface Props {
  store: IStore
}

@inject('store')
@observer
class Logout extends React.Component<Props> {
  componentDidMount() {
    this.props.store.userStore.logout()
  }

  render () {
    return <Router.Redirect to="/" />
  }
}

export default Logout
