import {APP_TITLE} from '@shared/config'
import * as React from 'react'
import {Head} from './head'

export const Title = ({children}) => (
  <Head>
    <title>
      {[children, APP_TITLE].filter(Boolean).join(' - ')}
    </title>
  </Head>
)
