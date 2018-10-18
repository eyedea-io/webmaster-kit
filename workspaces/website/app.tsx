import {createStore} from '@shared/utils/create-store'
import {NormalizeCSS} from '@shared/utils/normalize'
import {ThemeProvider} from '@shared/utils/styled'
import {Modals} from '@website/components'
import {SENTRY_URL, UI} from '@website/config'
import {Store} from '@website/stores'
import '@website/styles'
import {GlobalCSS} from '@website/styles'
import {observer, Provider} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {Routes} from './routes'

@hot(module)
@observer
export class App extends React.Component {
  componentDidMount() {
    if (SENTRY_URL) {
      Raven.config(SENTRY_URL).install()
    }
  }

  render() {
    return (
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
    )
  }
}
