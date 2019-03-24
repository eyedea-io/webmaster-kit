import {StoreContext} from '@website/contexts/store'
import {Store} from '@website/store'
import {useContext} from 'react'

export const useTranslation = () => useContext<Store>(StoreContext).langStore
