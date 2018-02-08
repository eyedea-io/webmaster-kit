import * as React from 'react'
import * as Router from 'react-router-dom'
import {inject, observer} from 'mobx-react'

import './icons'
import {IStore} from './types'
import {connect} from './utils'

import {MissingView} from './views/missing'
import {LoginView} from './views/login'
import {IndexView} from './views'

interface Props {
  store: IStore
}

class Application extends React.Component<Props> {
  render() {
    return (
      <Router.HashRouter>
        <Router.Switch>
          <Router.Route exact path="/" component={connect(IndexView)} />
          <Router.Route exact path="/auth/login" component={connect(LoginView)} />
          <Router.Route component={MissingView} />
        </Router.Switch>
      </Router.HashRouter>
    )
  }
}

export const App = connect(Application)
