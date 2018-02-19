import * as React from 'react'
import * as Router from 'react-router'
import {IStore} from '../../types'
import {inject, observer} from 'mobx-react'

interface Props {
  store: IStore
}

@inject('store')
@observer
class LogoutView extends React.Component<Props> {
  componentDidMount() {
    this.props.store.userStore.logout()
  }

  render () {
    return <Router.Redirect to="/" />
  }
}

export {LogoutView}
