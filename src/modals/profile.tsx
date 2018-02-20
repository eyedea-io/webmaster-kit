import * as React from  'react'
import {inject, observer} from 'mobx-react'
import {IStore} from '../types'

interface Props {
  store: IStore
}

@inject('store')
@observer
class Profile extends React.Component<Props> {
  render() {
    return (
      <div>
        <b>Email:</b> {this.props.store.userStore.profile.username}
      </div>
    )
  }
}

export {Profile}
