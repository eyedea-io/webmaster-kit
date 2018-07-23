import {Provider} from 'mobx-react'
import * as React from 'react'
import {UI} from '../../workspaces/shared/config'
import {createStore} from '../../workspaces/shared/utils/create-store'
import {ThemeProvider} from '../../workspaces/shared/utils/styled'
import {Store} from '../../workspaces/website/types'
const createWrapperProxy = require('react-cosmos-wrapper-proxy').default
import {hot} from 'react-hot-loader'
import {BrowserRouter} from 'react-router-dom'
import {Page as WebsitePage} from '../../workspaces/shared/components/page'

const pages = {
  website: WebsitePage,
}

const store = createStore(Store)
const component = hot(module)(({children, ...props}) => {
  const Page = pages[props.page] || WebsitePage

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={UI}>
          <Page>
            <div style={{padding: 32}}>
              {children}
            </div>
          </Page>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
})

const wrapperProxy = createWrapperProxy({
  component,
  fixtureKey: 'wrap',
})

export default [wrapperProxy]
