import {Router} from '@reach/router'
import {SENTRY_URL, UI} from '@shared/config'
import {createStore} from '@shared/utils/create-store'
import {loadable} from '@shared/utils/loadable'
import '@shared/utils/normalize'
import {ThemeProvider} from '@shared/utils/styled'
import {Modals} from '@website/components'
import {Store} from '@website/stores'
import '@website/styles'
import {observer, Provider} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import RedBox from 'redbox-react'

const routes = getRoutes()

@hot(module)
@observer
export class App extends React.Component<{}, {
  error: any
}> {
  constructor(props: any) {
    super(props)
    this.state = {error: null}
  }

  componentDidMount() {
    if (SENTRY_URL) {
      Raven.config(SENTRY_URL).install()
    }
  }

  componentDidCatch(error: any) {
    this.setState({error})
  }

  render() {
    if (this.state.error) {
      return <RedBox error={this.state.error} />
    }

    return (
      <Provider store={createStore(Store)}>
        <ThemeProvider theme={UI}>
          <React.Fragment>
            <Router>
              <routes.Index path="/" />
              <routes.Auth.Login path="auth/login" />
              <routes.Auth.Register path="auth/register" />
              <routes.Auth.Logout path="auth/logout" />
              <routes.Missing default />
            </Router>

            <Modals />
          </React.Fragment>
        </ThemeProvider>
      </Provider>
    )
  }
}

function getRoutes() {
  return {
    Index:  loadable(() => import('@website/pages/landing')),
    Missing: loadable(() => import('@website/pages/missing')),
    Auth: {
      Login:  loadable(() => import('@website/pages/auth/login')),
      Logout: loadable(() => import('@website/pages/auth/logout')),
      Register: loadable(() => import('./pages/auth/register')),
    },
  }
}
