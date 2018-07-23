import {Message} from './'

export default [
  {
    component: Message,
    name: 'positive',
    wrap: true,
    props: {
      children: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    component: Message,
    name: 'negative',
    wrap: true,
    props: {
      variant: 'negative',
      children: 'Lorem ipsum dolor sit amet',
    },
  },
]
