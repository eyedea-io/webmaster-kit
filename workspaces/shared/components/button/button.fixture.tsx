import {Button} from './'

export default [
  {
    component: Button,
    name: 'default',
    wrap: true,
    props: {
      children: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    component: Button,
    name: 'primary',
    wrap: true,
    props: {
      variant: 'primary',
      children: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    component: Button,
    name: 'negative',
    wrap: true,
    props: {
      variant: 'negative',
      children: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    component: Button,
    name: 'positive',
    wrap: true,
    props: {
      variant: 'positive',
      children: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    component: Button,
    name: 'disabled',
    wrap: true,
    props: {
      variant: 'primary',
      disabled: true,
      children: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    component: Button,
    name: 'loading',
    wrap: true,
    props: {
      variant: 'primary',
      loading: true,
      children: 'Lorem ipsum dolor sit amet',
    },
  },
]
