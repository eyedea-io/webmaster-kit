import {SentryErrorBoundary} from '@shared/components/sentry-error-boundary'
import {createStore} from '@shared/utils/create-store'
import {initSentry} from '@shared/utils/init-sentry'
import {NormalizeCSS} from '@shared/utils/normalize'
import {ThemeProvider} from '@shared/utils/styled'
import {Modals} from '@website/components'
import {UI} from '@website/config'
import {Store} from '@website/stores'
import '@website/styles'
import {GlobalCSS} from '@website/styles'
import {observer, Provider} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {Routes} from './routes'

class App extends React.Component {
  componentDidMount() {
    initSentry()
  }

  render() {
    return (
      <SentryErrorBoundary>
        <Provider store={createStore(Store)}>
          <ThemeProvider theme={UI}>
            <React.Fragment>
              <Routes />
              <Modals />
              <NormalizeCSS />
              <GlobalCSS />
            </React.Fragment>
          </ThemeProvider>
        </Provider>
      </SentryErrorBoundary>
    )
  }
}

export default hot(module)(observer(App))
