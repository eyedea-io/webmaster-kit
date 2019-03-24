import {History} from '@reach/router'
import {routeState} from '@website/state/route'
import * as React from 'react'

export const handlePathnameChange = (history: History) => {
  const dispatch = routeState.getDispatch()

  React.useEffect(() => {
    dispatch({type: 'setPathname', payload: window.location.pathname})

    history.listen((params) => {
      dispatch({type: 'setPathname', payload: params.location.pathname})
    })
  }, [])
}
