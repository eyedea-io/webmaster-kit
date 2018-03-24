import {defineAs} from '@shared/utils/define-as'
import {IStore} from '@website/types'

interface Props {
  store: IStore
}

export const as = {
  guest: defineAs((props: Props) => !props.store.userStore.isLoggedIn),
  member: defineAs((props: Props) => props.store.userStore.isLoggedIn),
  // admin: defineAs(props => props.store.userStore.isAdmin),
}
