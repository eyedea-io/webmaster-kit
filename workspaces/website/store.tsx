import {custom} from '@shared/types/custom'
import {FormStore} from '@shared/types/form-store'
import {LangStore} from '@shared/types/lang-store'
import {UserStore} from '@shared/types/user-store'
import {Instance, types} from 'mobx-state-tree'

export const Store = types
  .model('Store', {
    langStore: custom.model(LangStore),
    userStore: custom.model(UserStore),
    formStore: custom.model(FormStore),
  })

export interface Store extends Instance<typeof Store> {}
