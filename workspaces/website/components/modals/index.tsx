import {Modal} from '@shared/components/modal'
import {loadable} from '@shared/utils/loadable'
import * as React from 'react'

const Profile = loadable(() => import('./profile').then(res => res.Profile || res))

export const Modals = () => (
  <React.Fragment>
    <Modal name="profile" title="My profile" component={Profile} />
  </React.Fragment>
)
