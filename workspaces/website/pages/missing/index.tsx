import {Link, Title} from '@shared/components'
import {View} from '@website/pages/missing/styled'
import {WithStore} from '@website/types'
import {inject} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

@inject('store')
@hot(module)
class Missing extends React.Component<WithStore> {
  render() {
    const {t} = this.props.store

    return (
      <React.Fragment>
        <Title>Not Found</Title>

        <View>
          <h1>{t`Page was not found`}</h1>
          <Link mt="sm" to="/">{t`Back to home`}</Link>
        </View>
      </React.Fragment>
    )
  }
}

export default Missing
