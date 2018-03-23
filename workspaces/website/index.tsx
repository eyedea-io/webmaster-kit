import {loadable} from '@shared/utils/loadable'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = loadable(() => import('./app').then(res => res.App || res))

ReactDOM.render(<App />, document.querySelector('#root'))
