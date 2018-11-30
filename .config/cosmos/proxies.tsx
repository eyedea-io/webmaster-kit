import {Provider} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {createStore} from '../../workspaces/shared/utils/create-store'
import {NormalizeCSS} from '../../workspaces/shared/utils/normalize'
import {ThemeProvider} from '../../workspaces/shared/utils/styled'
import {UI} from '../../workspaces/website/config'
import {Store} from '../../workspaces/website/stores'
import {GlobalCSS} from '../../workspaces/website/styles'
const createWrapperProxy = require('react-cosmos-wrapper-proxy').default

const store = createStore(Store)
const component = hot(module)(({children, ...props}) => {
  if (props.page === 'website' || props.page === undefined) {
    require('@website/styles')
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={UI}>
        <div style={{padding: 32}}>
          {children}
          <NormalizeCSS />
          <GlobalCSS />
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
