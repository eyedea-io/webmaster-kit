import {Modals, NProgress} from '@components'
import {UI} from '@config'
import {observer} from '@utils'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'
import * as Routes from './routes'
import './utils/icons'

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
