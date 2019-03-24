import {Link} from '@reach/router'
import * as UserSelectors from '@website/selectors/user'
import {routeState} from '@website/state/route'
import {userState} from '@website/state/user'
import * as React from 'react'
import Jira from './jira-brands.svg'
import Kasper from './kasper.jpg'

const ConnectedComponent = () => {
  const [{pathname}] = routeState.use()
  const [{displayName}, dispatch] = userState.select([
    UserSelectors.selectDisplayName,
  ])

  if (displayName === undefined) {
    return <img src={Kasper} />
  }

  return (
    <>
      <img src={Jira} />
      <div>{pathname}</div>
      <Link to="/about/10">About</Link>
      {displayName}
      <button onClick={() => {
        dispatch({type: 'setToken', payload: undefined})
        dispatch({type: 'setProfile', payload: undefined})
      }}>
        Logout
      </button>
    </>
  )
}

const OtherComponent = () => (
  <div>Looks good</div>
)

export default () => (
  <div>
    <OtherComponent />
    <ConnectedComponent />
  </div>
)
