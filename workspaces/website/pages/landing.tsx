import * as React from 'react'
import * as UserSelectors from '@website/selectors/user'
import {routeState} from '@website/state/route'
import {userState} from '@website/state/user'
import Kasper from './kasper.jpg'

const ConnectedComponent: React.FC = () => {
  const [{pathname}] = routeState.use()
  const [{displayName}, dispatch] = userState.select([UserSelectors.selectDisplayName])

  if (displayName === undefined) {
    return <img src={Kasper} alt="" />
  }

  return (
    <>
      <div>{pathname}</div>
      {displayName}
      <button
        onClick={() => {
          dispatch({type: 'setToken', payload: undefined})
          dispatch({type: 'setProfile', payload: undefined})
        }}
      >
        Logout
      </button>
    </>
  )
}

const OtherComponent = () => <div>Ook ok</div>

export default () => (
  <div>
    <OtherComponent />
    <ConnectedComponent />
  </div>
)
