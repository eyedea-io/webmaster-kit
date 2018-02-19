import * as React from 'react'
import * as Router from 'react-router-dom'
import {Head, Page, Input, Button, InputList, Wrapper} from '../../components'
import {isEmail, as} from '../../utils'
import {IStore} from '../../types'
import {APP_TITLE, CSS} from '../../constants'
import {observer, inject} from 'mobx-react'

interface Props extends Router.RouteComponentProps<{}> {
  store: IStore
}

@inject ('store')
@as.member(() => <Router.Redirect to="/" />)
@observer
class RegisterView extends React.Component<Props> {
  private readonly title = `Register - ${APP_TITLE}`
  private readonly formName = 'Register'
  private readonly formFields = {
    username: {
      autoFocus: true,
      placeholder: 'your@email.com',
      label: 'Your email'
    },
    password: {
      type: 'password',
      label: 'Your password'
    }
  }

  componentWillMount() {
    this.props.store.formStore.add(this.formName, this.formFields)
  }

  render() {
    if (this.isLoggedIn) {
      return <Router.Redirect to="/" />
    }

    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <Wrapper>
          <form className="Form" onSubmit={this.handleSubmit}>
            <h1 className="u-mb">Create account</h1>

            <InputList errors={this.form.errors.all}>
              <Input value={this.form.fields.username.value} {...this.form.editable('username')}/>
              <Input value={this.form.fields.password.value} {...this.form.editable('password')}/>
              <Button primary loading={this.isPending} disabled={!this.allowSubmit}>Sign up</Button>
              <div>
                <Router.Link to="/auth/login">Sign in</Router.Link>
              </div>
            </InputList>
          </form>
        </Wrapper>

        <style jsx>{`
          .Form {
            margin-left: auto;
            margin-right: auto;
            max-width: 480px;
            padding: ${CSS.spacing} 0;
          }
        `}</style>
      </Page>
    )
  }

  private get form() {
    return this.props.store.formStore.get(this.formName)
  }

  private get isLoggedIn(): boolean {
    return this.props.store.userStore.isLoggedIn
  }

  private get isPending(): boolean {
    return this.props.store.userStore.pending.has('register')
  }

  private get allowSubmit(): boolean {
    const {fields} = this.form

    return isEmail(fields.username.value) && fields.password.value
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await this.props.store.userStore.register(this.form.data)
    } catch (err) {
      this.form.errors.replace(err.response.data)
    }
  }
}

export {RegisterView}
