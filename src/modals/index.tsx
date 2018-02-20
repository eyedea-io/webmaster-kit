import * as React from 'react'
import {Modal} from '../components'
import {Profile} from './profile'
import {IStore} from '../types'

export default () => (
  <React.Fragment>
    <Modal name="profile" title="My profile" component={Profile} />
  </React.Fragment>
)
