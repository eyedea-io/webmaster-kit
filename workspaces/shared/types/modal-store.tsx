import {types} from 'mobx-state-tree'

export const ModalStore = types
  .model('ModalStore', {
    active: types.maybe(types.enumeration([''])),
  })
  .actions(self => ({
    open(name: string) {
      self.active = name
    },
    close() {
      self.active = undefined
    },
    toggle(name: string) {
      self.active = self.active ? undefined : name
    },
  }))

export type IModalStore = typeof ModalStore.Type
