import {Head, Link, Page} from '@shared/components'
import {APP_TITLE} from '@shared/config'
import {View} from '@website/pages/missing/styled'
import * as React from 'react'
import {hot} from 'react-hot-loader'

@hot(module)
class Missing extends React.Component {
  private readonly title = `Not Found - ${APP_TITLE}`

  render() {
    return (
      <Page>
        <Head>
          <title>{this.title}</title>
        </Head>

        <View>
          <h1 className="u-mb-">Page was not found</h1>
          <Link to="/">Back to home</Link>
        </View>
      </Page>
    )
  }
}

export default Missing
