import {types} from 'mobx-state-tree'
import {syncano} from '../utils'
import {FormStore, Form} from './form'
import {User, UserStore} from './user'
import {Modal} from './modal'

export const Store = types
  .model('Store', {
    modal: types.optional(Modal, {}),
    userStore: types.optional(UserStore, {}),
    formStore: types.optional(FormStore, {})
  })

export type IStore = typeof Store.Type
export {IUser, IUserStore} from './user'
export {IForm, IFormStore} from './form'
export {IModal} from './modal'
