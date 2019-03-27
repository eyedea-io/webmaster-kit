import produce from 'immer'
import {createContext, useContext, useReducer} from 'react'
import * as React from 'react'

type noop = () => void
export type IAction<T, P> = {type: T; payload: P}
export function createState<S, Actions>({
  initialState,
  actions,
  afterCreate,
  beforeDestroy,
}: {
  initialState: S
  actions?: (state: S, action: Actions) => void
  beforeDestroy?: (state: S, dispatch: React.Dispatch<Actions>) => void
  afterCreate?: (state: S, dispatch: React.Dispatch<Actions>) => void
}) {
  const StateContext = createContext<S>(initialState)
  const DispatchContext = createContext<React.Dispatch<Actions> | noop>(() => {})
  const reducer = actions
    ? produce((state, action) => {
        actions(state, action)
      })
    : () => ({})

  const useSelectHook: <P>(
    selectors: Array<(state: S) => P>
  ) => [P, React.Dispatch<Actions>] = selectors => {
    const state = useContext(StateContext)

    return [
      selectors.length
        ? selectors.reduce(
            (all, selector) => ({
              ...all,
              ...selector(state),
            }),
            {} as any
          )
        : state,
      useContext(DispatchContext),
    ]
  }

  const useHook = (): [S, React.Dispatch<Actions>] => [
    useContext(StateContext),
    useContext(DispatchContext),
  ]
  const useGetDispatch = (): React.Dispatch<Actions> => useContext(DispatchContext)
  const Provider = React.memo(({children}: {children: React.ReactChild}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    React.useEffect(() => {
      if (typeof afterCreate === 'function') {
        afterCreate(initialState, dispatch)
      }

      return () => {
        if (typeof beforeDestroy === 'function') {
          beforeDestroy(initialState, dispatch)
        }
      }
    }, [])

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </StateContext.Provider>
    )
  })

  Provider.displayName = 'StateProvider'

  return {select: useSelectHook, use: useHook, getDispatch: useGetDispatch, Provider}
}

/**
 * Easily compose state providers with your component
 * @example
 * composeStateProviders(App, [userState, routeState, companyState])
 */
export const composeStateProviders = (
  Component: React.FC,
  States: Array<{
    Provider: React.MemoExoticComponent<(props: {children: React.ReactChild}) => JSX.Element>
  }>
) =>
  States.reduce((Tree, State) => {
    const ComposedProviders = () => (
      <State.Provider>
        <Tree />
      </State.Provider>
    )

    return ComposedProviders
  }, Component)
