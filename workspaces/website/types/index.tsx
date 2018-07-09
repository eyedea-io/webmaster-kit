import {FormStore} from '@shared/types/form-store'
import {UserStore} from '@shared/types/user-store'
import {types} from 'mobx-state-tree'
import {hot} from 'react-hot-loader'
// import {Modal} from '@website/types/modal'

const Store = hot(module)(types
  .model('Store', {
    // modal: types.optional(Modal, {}),
    userStore: types.optional(UserStore, {}),
    formStore: types.optional(FormStore, {}),
  }))

export {Store}
export type IStore = typeof Store.Type
export {IUser} from '@shared/types/user'
export {IUserStore} from '@shared/types/user-store'
export {IForm} from '@shared/types/form'
export {IFormStore} from '@shared/types/form-store'
export {IModal} from '@website/types/modal'
