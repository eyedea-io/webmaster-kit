import {WORKSPACE_TITLE} from '@website/config'
import * as React from 'react'
import {Head} from './head'

export const Title = ({children}: {children?: React.ReactChild}) => (
  <Head>
    <title>
      {[children, WORKSPACE_TITLE].filter(Boolean).join(' - ')}
    </title>
  </Head>
)
