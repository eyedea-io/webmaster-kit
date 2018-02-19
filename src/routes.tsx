import * as React from 'react'
import * as Router from 'react-router-dom'
import './icons'

import {IndexView} from './views'
import {AuthView} from './views/auth'
import {MissingView} from './views/missing'

const {Route, Switch, BrowserRouter} = Router

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={IndexView} />
      <Route path="/auth" component={AuthView} />
      <Route component={MissingView} />
    </Switch>
  </BrowserRouter>
)
