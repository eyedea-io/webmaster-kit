import {WithStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'

interface Props extends WithStore {}

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
