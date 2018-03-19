import {observer} from '@utils'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

import './icons'
import Modals from './modals'
import {Index} from './pages'
import {Auth} from './pages/auth'
import {Missing} from './pages/missing'

@hot(module)
@observer
class Routes extends React.Component {
  render() {
    return (
      <Router.BrowserRouter>
        <React.Fragment>
          <Router.Switch>
            <Router.Route exact path="/" component={Index} />
            <Router.Route path="/auth" component={Auth} />
            <Router.Route component={Missing} />
          </Router.Switch>

          <Modals />
        </React.Fragment>
      </Router.BrowserRouter>
    )
  }
}

export {Routes}
