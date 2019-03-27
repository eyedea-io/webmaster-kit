import {createHistory, LocationProvider} from '@reach/router'
import {composeStateProviders} from '@shared/utils/state-manager'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {Routes} from './routes'
import {GlobalCSS} from './styles'

const history = createHistory(window as any)

const App = () => (
  <LocationProvider history={history}>
    <Routes />
    <GlobalCSS />
  </LocationProvider>
)

const AppWithState = composeStateProviders(App, [])

export default hot(module)(AppWithState)
