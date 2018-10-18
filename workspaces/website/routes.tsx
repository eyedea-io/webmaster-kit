import {Router} from '@reach/router'
import {loadable} from '@shared/utils/loadable'
import '@shared/utils/normalize'
import {ROUTER_BASEPATH} from '@website/config'
import '@website/styles'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {WithStore} from './types'

const routes = getRoutes()

export interface Props extends WithStore {}

@hot(module)
@inject('store')
@observer
export class Routes extends React.Component<Props> {
  render() {
    return (
      <Router basepath={ROUTER_BASEPATH}>
        <routes.Index path="/" />
        <routes.Auth.Login path="/auth/login" />
        <routes.Auth.Register path="/auth/register" />
        <routes.Auth.Logout path="/auth/logout" />
        <routes.Missing default />
      </Router>
    )
  }
}

function getRoutes() {
  return {
    Index:  loadable(() => import('@website/pages/landing')),
    Missing: loadable(() => import('@website/pages/missing')),
    Auth: {
      Login:  loadable(() => import('@website/pages/auth/login')),
      Logout: loadable(() => import('@website/pages/auth/logout')),
      Register: loadable(() => import('./pages/auth/register')),
    },
  }
}
