import {createHistory, LocationProvider} from '@reach/router'
import {composeStateProviders} from '@shared/utils/state-manager'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {usePathnameChangeHandler} from './hooks/use-pathname-change-handler'
import {Routes} from './routes'
import {routeState} from './state/route'
import {GlobalCSS} from './styles'
import {userState} from './state/user'

const history = createHistory(window as any)

const App = () => {
  usePathnameChangeHandler(history)

  return (
    <LocationProvider history={history}>
      <Routes />
      <GlobalCSS />
    </LocationProvider>
  )
}

export default hot(module)(composeStateProviders(App, [userState, routeState]))
