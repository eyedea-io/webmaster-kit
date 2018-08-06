import {Block} from './'

const _ = (name, props) => ({
  component: Block,
  name,
  wrap: true,
  props: {
    children: 'Lorem ipsum dolor sit amet',
    ...props,
  },
})

export default [
  _('padding', {p: 'md'}),
  _('padding-left', {pl: 'md'}),
  _('padding-right', {pr: 'md'}),
  _('padding-bottom', {pb: 'md'}),
  _('padding-top', {pt: 'md'}),
  _('padding-vertical', {pv: 'md'}),
  _('padding-horizontal', {ph: 'md'}),

  _('margin', {m: 'md'}),
  _('margin-left', {ml: 'md'}),
  _('margin-right', {mr: 'md'}),
  _('margin-bottom', {mb: 'md'}),
  _('margin-top', {mt: 'md'}),
  _('margin-vertical', {mv: 'md'}),
  _('margin-horizontal', {mh: 'md'}),
]
