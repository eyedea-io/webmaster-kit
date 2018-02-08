import * as React from 'react'
import {inject, observer} from 'mobx-react'

export const connect = (Component: React.ComponentType) => inject('store')(observer(Component))
