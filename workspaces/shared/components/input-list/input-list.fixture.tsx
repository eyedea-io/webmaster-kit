import * as React from 'react'
import {Input} from '../input'
import {InputList} from './'

const errors: any = ['General error message']

errors.email = 'Invalid email'
errors.password = 'Invalid password'

const children = [
  <Input key={1} placeholder={'Type your email...'} name="email" />,
  <Input key={2} placeholder={'Type your password...'} name="password" />,
]

export default [
  {
    component: InputList,
    name: 'default',
    wrap: true,
    props: {
      errors,
      children,
    },
  },
  {
    component: InputList,
    name: 'errors bellow inputs',
    wrap: true,
    props: {
      errorsPosition: 'end',
      errors,
      children,
    },
  },
  {
    component: InputList,
    name: 'errors above inputs',
    wrap: true,
    props: {
      errorsPosition: 'start',
      errors,
      children,
    },
  },
]
