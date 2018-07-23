import {Avatar} from './'

export default [
  {
    component: Avatar,
    name: 'default',
    wrap: true,
    props: {},
  },
  {
    component: Avatar,
    name: 'big',
    wrap: true,
    props: {
      size: 64,
    },
  },
  {
    component: Avatar,
    name: 'default with image',
    wrap: true,
    props: {
      src: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  },
  {
    component: Avatar,
    name: 'big with image',
    wrap: true,
    props: {
      size: 64,
      src: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  },
]
