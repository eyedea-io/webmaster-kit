import {createState, IAction} from '@shared/utils/state-manager'

export const initialState = {
  pathname: '/' as string,
}

export const routeState = createState<IState, IActions>({
  initialState,
  actions: (state, action) => {
    switch (action.type) {
      case 'setPathname':
        return void (state.pathname = action.payload)
      default:
        throw new Error('Invalid routeState reducer action')
    }
  },
})

export type IState = typeof initialState
export type IActions =
  IAction<'setPathname', string>
