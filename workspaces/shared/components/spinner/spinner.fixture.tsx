import {Spinner} from './'

export default [
  {
    component: Spinner,
    name: 'default',
    wrap: true,
  },
  {
    component: Spinner,
    name: 'small',
    wrap: true,
    props: {
      small: true,
    },
  },
]
