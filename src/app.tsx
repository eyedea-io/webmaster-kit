import {observer} from '@utils'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

import './icons'
import Modals from './modals'
import * as Routes from './routes'

@hot(module)
@observer
class App extends React.Component {
  render() {
    return (
      <Router.BrowserRouter>
        <React.Fragment>
          <Router.Switch>
            <Router.Route exact path="/" component={Routes.Index} />
            <Router.Route path="/auth" component={Routes.Auth.Index} />
            <Router.Route component={Routes.Missing} />
          </Router.Switch>

          <Modals />
        </React.Fragment>
      </Router.BrowserRouter>
    )
  }
}

export {App}
