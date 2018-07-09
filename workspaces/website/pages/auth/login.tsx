import {Button, Head, Input, InputList, Page} from '@shared/components'
import {APP_TITLE} from '@shared/config'
import {isEmail} from '@shared/utils/is-email'
import {Form, Heading} from '@website/pages/auth/styled'
import {IStore} from '@website/types'
import {as} from '@website/utils/as'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

interface Props extends Router.RouteComponentProps<{}> {
  store: IStore
}

@inject('store')
@as.member(() => <Router.Redirect to="/" />)
@hot(module)
@observer
class Login extends React.Component<Props> {
  @observable isLoading = false
  private readonly title = `Login - ${APP_TITLE}`
  private readonly formName = 'Login'
  private readonly formFields = {
    username: {
      autoFocus: true,
      label: 'Type email',
      placeholder: 'Type email...',
    },
    password: {
      type: 'password',
      placeholder: 'Type password...',
    },
  }

  constructor(props: Props) {
    super(props)
    this.props.store.formStore.add(this.formName, this.formFields)
  }

  render() {
    const {t} = this.props.store

    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <Form onSubmit={this.handleSubmit}>
          <Heading>{t`Welcome back!`}</Heading>

          <InputList errors={this.form.errors.all}>
            <Input value={this.form.fields.username.value} {...this.form.editable('username')}/>
            <Input value={this.form.fields.password.value} {...this.form.editable('password')}/>
            <Button variant="primary" loading={this.isLoading} disabled={!this.allowSubmit}>
              {t`Sign in`}
            </Button>
            <div>
              <Router.Link to="/auth/register">{t`Create account`}</Router.Link>
            </div>
          </InputList>
        </Form>
      </Page>
    )
  }

  private get form() {
    return this.props.store.formStore.get(this.formName)
  }

  private get allowSubmit(): boolean {
    const {fields} = this.form

    return isEmail(fields.username.value) && fields.password.value
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    this.isLoading = true

    try {
      await this.props.store.userStore.login(this.form.data)
    } catch (err) {
      this.form.errors.replace({
        message: err.response.data.message,
      })
    } finally {
      this.isLoading = false
    }
  }
}

export default Login
