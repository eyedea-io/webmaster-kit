import * as React from 'react'
import * as Router from 'react-router-dom'
import {Head, Icon, Page, Input, Button, List, Message, Textarea, FlexLayout, InputList, Wrapper} from '../components'
import {isEmail, syncano, connect} from '../utils'
import {IStore} from '../types'
import {APP_TITLE, CSS} from '../constants'

interface Props extends Router.RouteComponentProps<{}> {
  store: IStore
}

export class LoginView extends React.Component<Props> {
  private readonly title = `Login - ${APP_TITLE}`
  private readonly formName = 'Login'
  private readonly formFields = {
    username: {
      value: 'ideredpl@gmail.com',
      autoFocus: true,
      placeholder: 'your@email.com',
      label: 'Your email'
    },
    password: {
      value: 'aloha',
      type: 'password',
      label: 'Your password'
    }
  }

  private get form() {
    return this.props.store.formStore.get(this.formName)
  }

  private get fields() {
    const {editable} = this.form

    return {
      username: editable('username'),
      password: editable('password'),
    }
  }

  private get isLoggedIn(): boolean {
    return this.props.store.userStore.isLoggedIn
  }

  private get isLoggingIn(): boolean {
    return this.props.store.userStore.pending.has('login')
  }

  private get isButtonDisabled(): boolean {
    const {fields} = this.form

    return !isEmail(fields.username.value) || !fields.password.value
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await this.props.store.userStore.login(this.form.data)
    } catch (err) {
      this.form.errors.replace(err.message)
    }
  }

  private redirectAuthenticatedUser(): any {
    if (this.isLoggedIn) {
      return <Router.Redirect to="/" />
    }
  }

  componentWillMount() {
    this.props.store.formStore.add(this.formName, this.formFields).clear()
  }

  render() {
    this.redirectAuthenticatedUser()

    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>
        <Wrapper>
          <form className="Form" onSubmit={this.handleSubmit}>
            <InputList errors={this.form.errors.all} errorsPosition="each">
              <Input {...this.fields.username} />
              <Input {...this.fields.password} />
              <Button primary loading={this.isLoggingIn} disabled={this.isButtonDisabled}>Sign in</Button>
            </InputList>
          </form>
        </Wrapper>

        <style jsx>{`
          .Form {
            padding: ${CSS.spacing} 0;
          }
        `}</style>
      </Page>
    )
  }
}
