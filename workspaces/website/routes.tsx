import {Router} from '@reach/router'
import {loadable} from '@shared/utils/loadable'
import {ROUTER_BASEPATH} from '@website/config'
import * as React from 'react'

const pages = {
  Index: loadable(() => import('@website/pages/landing')),
}

export const Routes = () => (
  <Router basepath={ROUTER_BASEPATH}>
    <pages.Index path="/" />
  </Router>
)
