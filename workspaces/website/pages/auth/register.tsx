import * as Router from '@reach/router'
import {Button, Input, InputList, Link, Title} from '@shared/components'
import {isEmail} from '@shared/utils/is-email'
import {AuthForm, Heading} from '@website/pages/auth/styled'
import {WithStore} from '@website/types'
import {as} from '@website/utils/as'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

@inject('store')
@as.member(() => <Router.Redirect to="/" noThrow />)
@hot(module)
@observer
class Register extends React.Component<WithStore> {
  private errors = observable.map()
  private isLoading = observable.box(false)
  private form = this.props.store.formStore.add('register', {
    username: {
      autoFocus: true,
      placeholder: 'Type email...',
    },
    password: {
      type: 'password',
      placeholder: 'Type password',
    },
  })

  render() {
    const {t} = this.props.store

    return (
      <React.Fragment>
        <Title>Register</Title>

        <AuthForm onSubmit={this.handleSubmit}>
          <Heading>Create account</Heading>

          <InputList errors={this.errors}>
            <Input value={this.form.value('username')} {...this.form.field('username')}/>
            <Input value={this.form.value('password')} {...this.form.field('password')}/>
          </InputList>

          <Button mt="md" variant="primary" loading={this.isLoading.get()} disabled={!this.allowSubmit}>
            {t`Sign up`}
          </Button>

          <Link mt="xxs" to="/auth/login">{t`Sign in`}</Link>
        </AuthForm>
      </React.Fragment>
    )
  }

  private get allowSubmit(): boolean {
    return isEmail(this.form.value('username')) && this.form.value('password')
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      this.isLoading.set(true)
      await this.props.store.userStore.register(this.form.data)
      this.errors.clear()
      this.form.clear()
    } catch (err) {
      this.errors.replace(err.response.data)
    } finally {
      this.isLoading.set(false)
    }
  }
}

export default Register
