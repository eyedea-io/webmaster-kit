import {loadable} from '@shared/utils/loadable'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './register-service-worker'

const App = loadable(() => import('./app').then(res => res.App || res))

ReactDOM.render(<App />, document.querySelector('#root'))
registerServiceWorker()
