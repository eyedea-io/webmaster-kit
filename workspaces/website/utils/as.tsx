import {defineAs} from '@shared/utils/define-as'
import {IStore} from '@website/types'
import * as React from 'react'

interface Props {
  store: IStore | {}
}

export const as = {
  guest: defineAs(props => !props.store.userStore.isLoggedIn),
  member: defineAs(props => props.store.userStore.isLoggedIn),
  // admin: defineAs(props => props.store.userStore.isAdmin),
}
