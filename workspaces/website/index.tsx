import {registerErrorsListener} from '@shared/utils/errors-listener'
import {loadable} from '@shared/utils/loadable'
import {registerServiceWorker} from '@shared/utils/service-worker'
import * as React from 'react'
import {render} from 'react-dom'
import {setConfig} from 'react-hot-loader'

setConfig({logLevel: 'no-errors-please'})

const App = loadable(() => import('@website/app'))
const root = document.querySelector('#root')

if (process.env.NODE_ENV === 'production') {
  render(
    <React.Suspense fallback={<div />}>
      <App />
    </React.Suspense>, root)
} else {
  const RedBox = require('redbox-react').default

  try {
    render(
      <React.Suspense fallback={<div />}>
        <App />
      </React.Suspense>, root)
  } catch (e) {
    render(<RedBox error={e} />, root)
  }
}

registerErrorsListener()
registerServiceWorker()
