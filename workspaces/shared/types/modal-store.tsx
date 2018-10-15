import {types} from 'mobx-state-tree'

export const ModalStore = types
  .model('ModalStore', {
    active: types.maybe(types.enumeration([''])),
  })
  .actions(self => ({
    open(name: any) {
      self.active = name
    },
    close() {
      self.active = undefined
    },
    toggle(name: any) {
      self.active = self.active ? undefined : name
    },
  }))

export type IModalStore = typeof ModalStore.Type
