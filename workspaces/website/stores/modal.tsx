import {ModalStore} from '@shared/types/modal-store'
import {types} from 'mobx-state-tree'

export const Modal = types.compose(ModalStore, types.model({
  active: types.maybe(types.enumeration(['profile'])),
}))

export type IModal = typeof Modal.Type
