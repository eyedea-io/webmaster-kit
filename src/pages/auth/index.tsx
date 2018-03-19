import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'
import * as Routes from '../../routes'

@hot(module)
class Auth extends React.Component {
  render() {
    return (
      <Router.Switch>
        <Router.Route exact path="/auth/login" component={Routes.Auth.Login} />
        <Router.Route exact path="/auth/register" component={Routes.Auth.Register} />
        <Router.Route exact path="/auth/logout" component={Routes.Auth.Logout} />
        <Router.Route component={Routes.Missing} />
      </Router.Switch>
    )
  }
}

export default Auth
