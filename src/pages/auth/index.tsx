import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

import {Missing} from '../missing'
import {Login} from './login'
import {Logout} from './logout'
import {Register} from './register'

@hot(module)
class Auth extends React.Component {
  render() {
    return (
      <Router.Switch>
        <Router.Route exact path="/auth/login" component={Login} />
        <Router.Route exact path="/auth/register" component={Register} />
        <Router.Route exact path="/auth/logout" component={Logout} />
        <Router.Route component={Missing} />
      </Router.Switch>
    )
  }
}

export {Auth}
