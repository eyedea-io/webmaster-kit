import {Head, Link, Page} from '@shared/components'
import {APP_TITLE} from '@shared/config'
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

        <div className="Missing">
          <h1 className="u-mb-">Page was not found</h1>
          <Link to="/">Back to home</Link>
        </div>

        <style jsx>{`
          .Missing {
            text-align: center;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
        `}</style>
      </Page>
    )
  }
}

export default Missing
