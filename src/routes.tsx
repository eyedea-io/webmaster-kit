import * as React from 'react'
import * as Router from 'react-router-dom'
import Modals from './modals'
import {observer} from 'mobx-react'

import './icons'

import {IndexView} from './views'
import {AuthView} from './views/auth'
import {MissingView} from './views/missing'

@observer
class Routes extends React.Component {
  render() {
    return (
      <Router.BrowserRouter>
        <React.Fragment>
          <Router.Switch>
            <Router.Route exact path="/" component={IndexView} />
            <Router.Route path="/auth" component={AuthView} />
            <Router.Route component={MissingView} />
          </Router.Switch>

          <Modals />
        </React.Fragment>
      </Router.BrowserRouter>
    )
  }
}

export {Routes}
