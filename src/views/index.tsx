import * as React from 'react'
import * as Router from 'react-router-dom'
import {Head, Page, Input, Button, List, Message, Wrapper} from '../components'
import {isEmail, syncano, connect} from '../utils'
import {IStore} from '../types'
import {APP_TITLE} from '../constants'

interface Props extends Router.RouteComponentProps<{}> {
  store: IStore
}

export class IndexView extends React.Component<Props> {
  private readonly title = APP_TITLE

  render() {
    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <Wrapper>
          <h1>Welcome</h1>
          <Router.Link to="/auth/login">Login</Router.Link>
        </Wrapper>
      </Page>
    )
  }
}
