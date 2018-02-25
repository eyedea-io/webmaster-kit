import {types, getRoot, flow} from 'mobx-state-tree'
import {IStore} from '.'
import {syncano} from '../utils'

export const User = types
  .model('User', {
    id: types.identifier(types.number),
    username: types.string,
    first_name: types.maybe(types.string),
    last_name: types.maybe(types.string)
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
      return Boolean(self.token && self.profile)
    }
  }))
  .actions(self => ({
    setToken(token: string = '') {
      self.token = token
      localStorage.setItem('token', token)
    }
  }))
  .actions(self => ({
    fetchProfile: flow(function * () {
      if (!self.token) {
        return
      }

      try {
        self.pending.set('fetch-profile', '')
        self.profile = yield syncano('api/profile')
      } catch (error) {
        if (error.response.data.message === 'User profile was not found.') {
          self.setToken()
        }
        throw error
      } finally {
        self.pending.delete('fetch-profile')
      }
    }),
  }))
  .actions(self => ({
    afterCreate: flow(function * () {
      self.token = window.localStorage.getItem('token') || ''
      self.fetchProfile()
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
        self.setToken(session.token)
        self.fetchProfile()
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
        self.setToken(session.token)
      } catch (error) {
        throw error
      } finally {
        self.pending.delete('register')
      }
    })
  }))

export type IUser = typeof User.Type
export type IUserStore = typeof UserStore.Type
