import {Modals, NProgress} from '@shared/components'
import {UI} from '@shared/config'
import {loadable, observer} from '@shared/utils'
import '@shared/utils/icons'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

const Routes = getRoutes()

@hot(module)
@observer
class App extends React.Component {
  render() {
    return (
      <Router.BrowserRouter>
        <React.Fragment>
          <Router.Switch>
            <Router.Route exact path="/" component={Routes.Index} />
            <Router.Route exact path="/auth/login" component={Routes.Auth.Login} />
            <Router.Route exact path="/auth/register" component={Routes.Auth.Register} />
            <Router.Route exact path="/auth/logout" component={Routes.Auth.Logout} />
            <Router.Route component={Routes.Missing} />
          </Router.Switch>

          <Modals />
          <NProgress />
        </React.Fragment>
      </Router.BrowserRouter>
    )
  }
}

export {App}

function getRoutes() {
  return {
    Index: loadable(() => import('./pages/index')),
    Missing: loadable(() => import('./pages/missing')),
    Auth: {
      Login: loadable(() => import('./pages/auth/login')),
      Logout: loadable(() => import('./pages/auth/logout')),
      Register: loadable(() => import('./pages/auth/register')),
    },
  }
}
