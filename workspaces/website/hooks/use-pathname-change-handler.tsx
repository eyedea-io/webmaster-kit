import {History} from '@reach/router'
import {routeState} from '@website/state/route'
import {useEffect} from 'react'

export function usePathnameChangeHandler(history: History) {
  const dispatch = routeState.getDispatch()

  useEffect(() => {
    dispatch({type: 'setPathname', payload: window.location.pathname})

    history.listen(params => {
      dispatch({type: 'setPathname', payload: params.location.pathname})
    })
  }, [dispatch, history])
}
