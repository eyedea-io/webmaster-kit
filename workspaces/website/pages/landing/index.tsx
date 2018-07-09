import {Head, List, Page} from '@shared/components'
import {APP_TITLE} from '@shared/config'
import {View} from '@website/pages/landing/styled'
import {IStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

interface Props extends Router.RouteComponentProps<{}> {
  store: IStore
}

@hot(module)
@inject('store')
@observer
class Index extends React.Component<Props> {
  private readonly title = APP_TITLE

  render() {
    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <View>
          <h1 className="u-mb">Webmaster Kit</h1>

          <List horizontal spacing="sm">
            {this.isLoggedIn ? this.renderUserNav() : this.renderGuestNav()}
          </List>
        </View>
      </Page>
    )
  }

  renderUserNav = () => (
    <React.Fragment>
      <Router.Link to="/auth/logout">{this.props.store.t`Sign out`}</Router.Link>

      <a onClick={() => this.props.store.modal.open('profile')}>
        {this.props.store.t`My profile`}
      </a>
    </React.Fragment>
  )

  renderGuestNav = () => (
    <React.Fragment>
      <Router.Link to="/auth/login">{this.props.store.t`Sign in`}</Router.Link>
      <Router.Link to="/auth/register">{this.props.store.t`Create account`}</Router.Link>
    </React.Fragment>
  )

  private get isLoggedIn(): boolean {
    return this.props.store.userStore.isLoggedIn
  }
}

export default Index
