import {LOCAL_STORAGE_KEY} from '@shared/config'
import {User} from '@shared/types/user'
import {syncano} from '@shared/utils/syncano'
import {applySnapshot, flow, getRoot, types} from 'mobx-state-tree'

export const UserStore = types
  .model('UserStore', {
    token: types.optional(types.string, ''),
    profile: types.maybe(User),
  })
  .views(self => ({
    get isLoggedIn(): boolean {
      return Boolean(self.token && self.profile)
    },
  }))
  .actions(self => ({
    setToken(token: string = '') {
      self.token = token
      localStorage.setItem('token', token)
      applySnapshot(getRoot(self), {})
    },
  }))
  .actions(self => ({
    fetchProfile: flow(function * () {
      if (!self.token) {
        return
      }

      try {
        self.profile = yield syncano('api/user/profile')
      } catch (error) {
        if (error.response.status === 401) {
          self.setToken()
        }
        throw error
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
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    },
    login: flow(function * (credentials: {username: string, password: string}) {
      const {token} = yield syncano('user-auth/login', credentials)

      self.setToken(token)

      return self.fetchProfile()
    }),
    register: flow(function * (credentials: {username: string, password: string}) {
      const {token} = yield syncano('user-auth/register', credentials)

      self.setToken(token)

      return self.fetchProfile()
    }),
  }))

export type IUserStore = typeof UserStore.Type
