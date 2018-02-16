import * as React from 'react'
import * as Router from 'react-router-dom'
import {inject, observer} from 'mobx-react'

import './icons'
import {IStore} from './types'
import {connect} from './utils'

import {MissingView} from './views/missing'
import {LoginView} from './views/auth/login'
import {LogoutView} from './views/auth/logout'
import {IndexView} from './views'
import {RegisterView} from './views/auth/register'

interface Props {
  store: IStore
}

class Application extends React.Component<Props> {
  render() {
    return (
      <Router.BrowserRouter>
        <Router.Switch>
          <Router.Route exact path="/" component={connect(IndexView)} />
          <Router.Route exact path="/auth/login" component={connect(LoginView)} />
          <Router.Route exact path="/auth/register" component={connect(RegisterView)} />
          <Router.Route exact path="/auth/logout" component={connect(LogoutView)} />
          <Router.Route component={MissingView} />
        </Router.Switch>
      </Router.BrowserRouter>
    )
  }
}

export const App = connect(Application)
