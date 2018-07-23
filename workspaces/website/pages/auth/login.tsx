import {Button, Head, Input, InputList, Page} from '@shared/components'
import {APP_TITLE} from '@shared/config'
import {Form} from '@shared/types/form'
import {isEmail} from '@shared/utils/is-email'
import {AuthForm, Heading} from '@website/pages/auth/styled'
import {Store} from '@website/types'
import {as} from '@website/utils/as'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import * as Router from 'react-router-dom'

interface Props extends Router.RouteComponentProps<{}> {
  store: Store
}

@inject('store')
@as.member(() => <Router.Redirect to="/" />)
@hot(module)
@observer
class Login extends React.Component<Props> {
  @observable private errors = observable.map()
  @observable private isLoading = false
  private form: Form

  constructor(props: Props) {
    super(props)

    const {t} = this.props.store

    this.form = this.props.store.formStore.add('login', {
      username: {
        autoFocus: true,
        placeholder: t`Type email...`,
      },
      password: {
        type: 'password',
        placeholder: t`Type password...`,
      },
    })
  }

  render() {
    const {t} = this.props.store

    return (
      <Page>
        <Head>
          <title>Login - {APP_TITLE}</title>
        </Head>

        <AuthForm onSubmit={this.handleSubmit}>
          <Heading>{t`Welcome back!`}</Heading>

          <InputList errors={this.errors}>
            <Input value={this.form.fields.username.value} {...this.form.editable('username')}/>
            <Input value={this.form.fields.password.value} {...this.form.editable('password')}/>
          </InputList>

          <Button className="u-mt--" variant="primary" loading={this.isLoading} disabled={!this.allowSubmit}>
            {t`Sign in`}
          </Button>

          <div className="u-mt--">
            <Router.Link to="/auth/register">{t`Create account`}</Router.Link>
          </div>
        </AuthForm>
      </Page>
    )
  }

  private get allowSubmit(): boolean {
    const {fields} = this.form

    return isEmail(fields.username.value) && fields.password.value
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      this.isLoading = true
      await this.props.store.userStore.login(this.form.data)
    } catch (err) {
      this.errors.replace(err.response.data)
    } finally {
      this.isLoading = false
    }
  }
}

export default Login
