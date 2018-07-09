import {Head, Link, Page} from '@shared/components'
import {APP_TITLE} from '@shared/config'
import {View} from '@website/pages/missing/styled'
import {IStore} from '@website/types'
import {inject} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

@inject('store')
@hot(module)
class Missing extends React.Component<{store: IStore}> {
  private readonly title = `Not Found - ${APP_TITLE}`

  render() {
    const {t} = this.props.store

    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <View>
          <h1 className="u-mb-">{t`Page was not found`}</h1>
          <Link to="/">{t`Back to home`}</Link>
        </View>
      </Page>
    )
  }
}

export default Missing
