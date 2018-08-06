import {loadable} from '@shared/utils/loadable'
import registerServiceWorker from '@shared/utils/register-service-worker'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {setConfig} from 'react-hot-loader'

setConfig({logLevel: 'no-errors-please'})

const App = loadable(() => import('@website/app').then(res => res.App || res))

ReactDOM.render(<App />, document.querySelector('#root'))

registerServiceWorker()
