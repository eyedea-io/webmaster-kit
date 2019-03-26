import {registerErrorsListener} from '@shared/utils/errors-listener'
import {loadable} from '@shared/utils/loadable'
import * as serviceWorker from '@shared/utils/service-worker'
import * as React from 'react'
import {render} from 'react-dom'

const App = loadable(() => import('@website/app'))

render(
  <React.Suspense fallback={<div />}>
    <App />
  </React.Suspense>,
  document.querySelector('#root')
)

registerErrorsListener()
serviceWorker.unregister()
