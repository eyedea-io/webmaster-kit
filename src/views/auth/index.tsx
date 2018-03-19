import * as React from 'react'
import * as Router from 'react-router-dom'

import {LoginView} from './login'
import {LogoutView} from './logout'
import {RegisterView} from './register'
import {hot} from 'react-hot-loader'
import {MissingView} from '../missing'

@hot(module)
class AuthView extends React.Component {
  render() {
    return (
      <Router.Switch>
        <Router.Route exact path="/auth/login" component={LoginView} />
        <Router.Route exact path="/auth/register" component={RegisterView} />
        <Router.Route exact path="/auth/logout" component={LogoutView} />
        <Router.Route component={MissingView} />
      </Router.Switch>
    )
  }
}

export {AuthView}
