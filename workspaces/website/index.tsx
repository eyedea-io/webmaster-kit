import {registerErrorsListener} from '@shared/utils/errors-listener'
import * as serviceWorker from '@shared/utils/service-worker'
import * as React from 'react'
import {render} from 'react-dom'
import App from './app'

render(
  <React.Suspense fallback={<div />}>
    <App />
  </React.Suspense>,
  document.querySelector('#root')
)

registerErrorsListener()
serviceWorker.unregister()
