import {WORKSPACE_TITLE} from '@website/config'
import * as React from 'react'
import {Head} from './head'

export const Title = ({children}) => (
  <Head>
    <title>
      {[children, WORKSPACE_TITLE].filter(Boolean).join(' - ')}
    </title>
  </Head>
)
