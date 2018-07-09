import {FormStore} from '@shared/types/form-store'
import {LangStore} from '@shared/types/lang-store'
import {UserStore} from '@shared/types/user-store'
import {Modal} from '@website/types/modal'
import {types} from 'mobx-state-tree'
import {hot} from 'react-hot-loader'

const Store = hot(module)(types
  .model('Store', {
    modal: types.optional(Modal, {}),
    langStore: types.optional(LangStore, {}),
    userStore: types.optional(UserStore, {}),
    formStore: types.optional(FormStore, {}),
  }))
  .views(self => ({
    get t() {
      return self.langStore.t
    },
  }))

export {Store}
export {IUser} from '@shared/types/user'
export {ILangStore} from '@shared/types/lang-store'
export {IUserStore} from '@shared/types/user-store'
export {IForm} from '@shared/types/form'
export {IFormStore} from '@shared/types/form-store'
export {IModal} from '@website/types/modal'

export type IStore = typeof Store.Type
