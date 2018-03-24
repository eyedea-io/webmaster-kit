import {FormStore} from '@shared/types/form'
import {UserStore} from '@shared/types/user'
import {types} from 'mobx-state-tree'
import {hot} from 'react-hot-loader'
import {Modal} from './modal'

const Store = hot(module)(types
  .model('Store', {
    modal: types.optional(Modal, {}),
    userStore: types.optional(UserStore, {}),
    formStore: types.optional(FormStore, {}),
  }))

export {Store}
export type IStore = typeof Store.Type
export {IUser, IUserStore} from '@shared/types/user'
export {IForm, IFormStore} from '@shared/types/form'
export {IModal} from './modal'
