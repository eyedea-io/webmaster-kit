import {createHistory, LocationProvider} from '@reach/router'
import {NormalizeCSS} from '@shared/utils/normalize-css'
import {composeStateProviders} from '@shared/utils/state-manager'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {handlePathnameChange} from './hooks/handle-pathname-change'
import {Routes} from './routes'
import {routeState} from './state/route'
import {userState} from './state/user'
import {GlobalCSS} from './styles'

const history = createHistory(window as any)

const App = () => {
  handlePathnameChange(history)

  return (
    <LocationProvider history={history}>
      <Routes />
      <NormalizeCSS />
      <GlobalCSS />
    </LocationProvider>
  )
}

export default hot(module)(composeStateProviders(App, [
  userState,
  routeState,
]))
