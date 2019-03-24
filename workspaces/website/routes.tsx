import {Router} from '@reach/router'
import {loadable} from '@shared/utils/loadable'
import {ROUTER_BASEPATH} from '@website/config'
import * as React from 'react'

const pages = {
  Index: loadable(() => import('@website/pages/landing')),
  About: loadable(() => import('@website/pages/about')),
}

export const Routes = () => (
  <Router basepath={ROUTER_BASEPATH}>
    <pages.Index path="/" />
    <pages.About path="/about/:id" />
  </Router>
)
