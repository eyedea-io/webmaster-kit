import {IState as IUserState} from '@website/state/user'

export const selectDisplayName = ({profile}: IUserState) => {
  return {
    displayName: profile ? profile.fullName || profile.username : undefined,
  }
}
