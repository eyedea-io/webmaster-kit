import {inject, observer} from 'mobx-react'
import * as React from 'react'

export const connect = (Component: React.ComponentType) => inject('store')(observer(Component))
