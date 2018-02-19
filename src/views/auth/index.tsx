import * as React from 'react'
import * as Router from 'react-router-dom'

import {LoginView} from './login'
import {LogoutView} from './logout'
import {RegisterView} from './register'

class AuthView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router.Route exact path="/auth/login" component={LoginView} />
        <Router.Route exact path="/auth/register" component={RegisterView} />
        <Router.Route exact path="/auth/logout" component={LogoutView} />
      </React.Fragment>
    )
  }
}

export {AuthView}
