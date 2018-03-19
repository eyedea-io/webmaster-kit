import {Provider} from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createStore} from 'utils/create-store'
import {App} from './app'
const root = document.createElement('div')

document
  .querySelector('body')
  .appendChild(root)

// Load state from localstorage
// INFO: Set this value, to save the store to localStorage on every change
const LOCAL_STORAGE_KEY = ''
const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}')

ReactDOM.render(
  <Provider store={createStore(initialState, LOCAL_STORAGE_KEY)}>
    <App />
  </Provider>,
  root
)
