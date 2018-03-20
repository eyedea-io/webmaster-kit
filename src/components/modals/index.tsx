import {Modal} from '@components'
import {IStore} from '@types'
import * as React from 'react'
import {Profile} from './profile'

export default () => (
  <React.Fragment>
    <Modal name="profile" title="My profile" component={Profile} />
  </React.Fragment>
)
