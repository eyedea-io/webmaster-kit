import {Link} from '@reach/router'
import {routeState} from '@website/state/route'
import * as React from 'react'

export default () => {
  const [{pathname}] = routeState.use()

  return (
    <div>
      <div>{pathname}</div>
      <Link to="/">Home</Link>
      About
    </div>
  )
}
