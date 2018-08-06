import {Input} from './'

export default [
  {
    component: Input,
    name: 'default',
    wrap: true,
    props: {},
  },
  {
    component: Input,
    name: 'with placeholder',
    wrap: true,
    props: {
      placeholder: 'Type your email...',
    },
  },
  {
    component: Input,
    name: 'disabled with placeholder',
    wrap: true,
    props: {
      placeholder: 'Type your email...',
      disabled: true,
    },
  },
  {
    component: Input,
    name: 'disabled with value',
    wrap: true,
    props: {
      value: 'hello@example.com',
      disabled: true,
    },
  },
  {
    component: Input,
    name: 'with value',
    wrap: true,
    props: {
      value: 'hello@example.com',
    },
  },
]
