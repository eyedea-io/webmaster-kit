import * as React from 'react'
import {List} from './'

export default [
  {
    component: List,
    name: 'default',
    wrap: true,
    props: {
      children: [
        <div key={1}>Child 1</div>,
        <div key={2}>Child 2</div>,
        <div key={3}>Child 3</div>,
      ],
    },
  },
  {
    component: List,
    name: 'large spacing',
    wrap: true,
    props: {
      spacing: 'lg',
      children: [
        <div key={1}>Child 1</div>,
        <div key={2}>Child 2</div>,
        <div key={3}>Child 3</div>,
      ],
    },
  },
  {
    component: List,
    name: 'small spacing',
    wrap: true,
    props: {
      spacing: 'sm',
      children: [
        <div key={1}>Child 1</div>,
        <div key={2}>Child 2</div>,
        <div key={3}>Child 3</div>,
      ],
    },
  },
  {
    component: List,
    name: 'with separators',
    wrap: true,
    props: {
      separated: true,
      spacing: 'xxs',
      children: [
        <div key={1}>Child 1</div>,
        <div key={2}>Child 2</div>,
        <div key={3}>Child 3</div>,
      ],
    },
  },
  {
    component: List,
    name: 'horizontal',
    wrap: true,
    props: {
      horizontal: true,
      spacing: 'sm',
      children: [
        <div key={1}>Child 1</div>,
        <div key={2}>Child 2</div>,
        <div key={3}>Child 3</div>,
      ],
    },
  },
]
