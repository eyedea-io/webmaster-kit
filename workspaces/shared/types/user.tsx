import {types} from 'mobx-state-tree'

export const User = types
  .model('User', {
    id: types.identifier(types.number),
    username: types.string,
    firstName: types.maybe(types.string),
    lastName: types.maybe(types.string),
  })
  .views(self => ({
    get fullName(): string {
      return [self.firstName, self.lastName].join(' ')
    },
  }))
  .views(self => ({
    get displayName(): string {
      return self.fullName === ' ' ? self.username : self.fullName
    },
  }))

type UserType = typeof User.Type
export interface User extends UserType {}
