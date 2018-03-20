import {loadable} from '@utils'
import * as React from 'react'

export const Index = loadable(() => import('./pages/index'))
export const Missing = loadable(() => import('./pages/missing'))
export const Auth = {
  Index: loadable(() => import('./pages/auth')),
  Login: loadable(() => import('./pages/auth/login')),
  Logout: loadable(() => import('./pages/auth/logout')),
  Register: loadable(() => import('./pages/auth/register')),
}
