import {LOCAL_STORAGE_KEY} from '@shared/config'
import {IModelType, onSnapshot} from 'mobx-state-tree'
import {IDisposer} from 'mobx-state-tree/dist/utils'

let snapshotListener: IDisposer

export const createStore = (Store: IModelType<{}, {}>) => {
  const snapshot = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}')

  // clean up snapshot listener
  if (snapshotListener) { snapshotListener() }

  window.store = window.store || Store.create(snapshot)

  if (LOCAL_STORAGE_KEY) {
    // On every store change, save whole store to localStorage
    snapshotListener = onSnapshot(window.store, state =>
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
    )
  }

  return window.store
}
