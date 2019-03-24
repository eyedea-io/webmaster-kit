import {Instance, types} from 'mobx-state-tree'

export const User = types
  .model('User', {
    id: types.identifierNumber,
    username: types.string,
    fullName: types.maybe(types.string),
  })
  .views(self => ({
    get displayName(): string {
      return self.fullName || self.username
    },
  }))

export interface User extends Instance<typeof User> {}
