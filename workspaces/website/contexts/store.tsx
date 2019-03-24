import {createStore} from '@shared/utils/create-store'
import {Store} from '@website/store'
import {createContext} from 'react'

export const StoreContext = createContext<Store>(createStore(Store))
