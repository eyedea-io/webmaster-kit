import {SENTRY_URL, UI} from '@shared/config'
import {createStore} from '@shared/utils/create-store'
import {loadable} from '@shared/utils/loadable'
import {ThemeProvider} from '@shared/utils/styled'
// import {Modals} from '@website/components'
import {Store} from '@website/types'
import {observer, Provider} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const Routes = getRoutes()

@hot(module)
@observer
class App extends React.Component<{}, {
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
      return <div>Something went wrong.</div>
    }

    return (
      <Provider store={createStore(Store)}>
        <BrowserRouter>
          <ThemeProvider theme={UI}>
            <React.Fragment>
              <Switch>
                <Route exact path="/" component={Routes.Index} />
                <Route exact path="/auth/login" component={Routes.Auth.Login} />
                <Route exact path="/auth/register" component={Routes.Auth.Register} />
                <Route exact path="/auth/logout" component={Routes.Auth.Logout} />
                <Route component={Routes.Missing} />
              </Switch>

              {/* <Modals /> */}
            </React.Fragment>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
}

export {App}

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
