import {destroy, IModelType, onSnapshot} from 'mobx-state-tree'
import {IDisposer} from 'mobx-state-tree/dist/utils'

let store
let snapshotListener: IDisposer

export const createStore = (Store: IModelType<{}, {}>, storageKey) => {
  const snapshot = JSON.parse(localStorage.getItem(storageKey) || '{}')

  // clean up snapshot listener
  if (snapshotListener) { snapshotListener() }
  // kill old store to prevent accidental use and run clean up hooks
  if (store) { destroy(store) }

  store = Store.create(snapshot)

  if (storageKey) {
    // On every store change, save whole store to localStorage
    snapshotListener = onSnapshot(store, state =>
      localStorage.setItem(storageKey, JSON.stringify(state))
    )
  }

  return store
}
