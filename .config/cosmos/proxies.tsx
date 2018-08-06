import {Provider} from 'mobx-react'
import * as React from 'react'
import {UI} from '../../workspaces/shared/config'
import {createStore} from '../../workspaces/shared/utils/create-store'
import {ThemeProvider} from '../../workspaces/shared/utils/styled'
import {Store} from '../../workspaces/website/types'
const createWrapperProxy = require('react-cosmos-wrapper-proxy').default
import {hot} from 'react-hot-loader'

const store = createStore(Store)
const component = hot(module)(({children, ...props}) => {
  if (props.page === 'website' || props.page === undefined) {
    require('@shared/styles')
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={UI}>
        <div style={{padding: 32}}>
          {children}
        </div>
      </ThemeProvider>
    </Provider>
  )
})

const wrapperProxy = createWrapperProxy({
  component,
  fixtureKey: 'wrap',
})

export default [wrapperProxy]
