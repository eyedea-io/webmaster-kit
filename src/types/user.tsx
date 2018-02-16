import {types, getRoot, flow} from 'mobx-state-tree'
import {IStore} from '.'
import {syncano} from '../utils'

export const User = types
  .model('User', {
    id: types.identifier(types.number),
    username: types.string,
    first_name: types.string,
    last_name: types.string
  })
  .views(self => ({
    get fullName(): string {
      return [self.first_name, self.last_name].join(' ')
    }
  }))
  .views(self => ({
    get displayName(): string {
      return self.fullName || self.username
    }
  }))

export const UserStore = types
  .model('UserStore', {
    token: types.optional(types.string, ''),
    profile: types.maybe(User),
    pending: types.optional(types.map(types.string), {})
  })
  .views(self => ({
    get isLoggedIn(): boolean {
      return Boolean(self.token)
    }
  }))
  .actions(self => ({
    setToken(token: string = '') {
      self.token = token
      localStorage.setItem('token', token)
    }
  }))
  .actions(self => ({
    afterCreate: flow(function * () {
      self.token = window.localStorage.getItem('token') || ''
    }),
    logout() {
      self.setToken()
      self.profile = null
    },
    login: flow(function * (credentials: {
      username: string,
      password: string,
    }) {
      try {
        self.pending.set('login', '')
        const session = yield syncano('user-auth/login', credentials)
        self.token = session.token
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('login')
      }
    }),
    register: flow(function * (credentials: {
      username: string,
      password: string,
    }) {
      try {
        self.pending.set('register', '')
        const session = yield syncano('user-auth/register', credentials)
        self.token = session.token
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('register')
      }
    })
  }))

export type IUser = typeof User.Type
export type IUserStore = typeof UserStore.Type
