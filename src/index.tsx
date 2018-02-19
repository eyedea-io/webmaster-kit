import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Router from 'react-router-dom'
import {Routes} from './routes'
import {Store, IStore} from './types'
import {observer, Provider} from 'mobx-react'
import {destroy, getSnapshot, onSnapshot} from 'mobx-state-tree'
import {IDisposer} from 'mobx-state-tree/dist/utils'
const {AppContainer} = require('react-hot-loader')

const root = document.createElement('div')

document
  .querySelector('body')
  .appendChild(root)

const render = (Component: React.ComponentType, storage: IStore) =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={storage}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  )

let store: IStore
let snapshotListener: IDisposer

// Load state from localstorage
// INFO: Set this value, to save the store to localStorage on every change
const LOCAL_STORAGE_KEY = ''
const localStorageState = localStorage.getItem(LOCAL_STORAGE_KEY)
const initialState = localStorageState ? JSON.parse(localStorageState) : {}

const createStore = (snapshot: object) => {
  // clean up snapshot listener
  if (snapshotListener) { snapshotListener() }
  // kill old store to prevent accidental use and run clean up hooks
  if (store) { destroy(store) }

  store = Store.create(snapshot)

  if (LOCAL_STORAGE_KEY !== '') {
    // On every store change, save whole store to localStorage
    snapshotListener = onSnapshot(store, state =>
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
    )
  }

  return store
}

// Initial render
render(Routes, createStore(initialState))

// Hot loading components
if (module.hot) {
  // Reload app and store
  module.hot.accept('./types', () => {
    render(Routes, createStore(getSnapshot(store)))
  })

  // Reload whole app
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').Routes

    render(NextApp, store)
  })
}
