import {createState, IAction} from '@shared/utils/state-manager'
import {User} from '@website/interfaces/user'

const profile = {
  id: 1,
  username: 'idered',
  fullName: 'Kasper Mikiewicz',
}

export const initialState = {
  token: undefined as string | undefined,
  profile: profile as User | undefined,
}

export const userState = createState<IState, IActions>({
  initialState,
  actions: async (state, action) => {
    switch (action.type) {
      case 'setToken':
        return state.token = action.payload
      case 'setProfile':
        return state.profile = action.payload
      default:
        throw new Error('Invalid userState reducer action')
    }
  },
})

export type IState = typeof initialState
export type IActions =
  IAction<'setToken', string | undefined> |
  IAction<'setProfile', User | undefined>
