import {Head, List, Page, Wrapper} from '@shared/components'
import {APP_TITLE, UI} from '@shared/config'
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

        <Wrapper>
          <div className="View">
            <h1 className="u-mb">Webmaster Kit</h1>

            <List horizontal spacing="sm">
              {this.isLoggedIn ? this.renderUserNav() : this.renderGuestNav()}
            </List>
          </div>
        </Wrapper>

        <style jsx>{`
          .View {
            margin-left: auto;
            margin-right: auto;
            max-width: 480px;
            padding: ${UI.spacing} 0;
          }
        `}</style>
      </Page>
    )
  }

  renderUserNav = () => (
    <React.Fragment>
      <Router.Link to="/auth/logout">Sign out</Router.Link>

      <a onClick={() => this.props.store.modal.open('profile')}>
        My profile
      </a>
    </React.Fragment>
  )

  renderGuestNav = () => (
    <React.Fragment>
      <Router.Link to="/auth/login">Sign in</Router.Link>
      <Router.Link to="/auth/register">Create account</Router.Link>
    </React.Fragment>
  )

  private get isLoggedIn(): boolean {
    return this.props.store.userStore.isLoggedIn
  }
}

export default Index
