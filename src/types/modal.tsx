import {types} from 'mobx-state-tree'

type ModalName = 'profile'

export const Modal = types
  .model('Modal', {
    active: types.maybe(types.string),
  })
  .actions(self => ({
    open(name: ModalName) {
      self.active = name
    },
    close() {
      self.active = null
    },
    toggle(name: ModalName) {
      self.active = self.active ? null : name
    },
  }))

export type IModal = typeof Modal.Type
