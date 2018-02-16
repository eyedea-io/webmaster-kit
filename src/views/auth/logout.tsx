import * as React from 'react'
import {IStore} from '../../types'
import {connect} from '../../utils'

interface Props {
  store: IStore
}

export class LogoutView extends React.Component<Props> {
  componentDidMount() {
    this.props.store.userStore.logout()
  }

  render () {
    window.location.replace('/')

    return null
  }
}
