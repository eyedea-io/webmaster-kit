import {types} from 'mobx-state-tree'
import {syncano} from '../utils'
import {FormStore, Form} from './form'
import {User, UserStore} from './user'

export const Store = types
  .model('Store', {
    userStore: types.optional(UserStore, {}),
    formStore: types.optional(FormStore, {})
  })

export type IStore = typeof Store.Type
export {IUser, IUserStore} from './user'
export {IForm, IFormStore} from './form'
