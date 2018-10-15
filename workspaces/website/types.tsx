import {NavigateFn, WindowLocation} from '@reach/router'
import {Store} from '@website/stores'

export interface WithStore {
  store?: Store
}
export type WithParams<TParams = {}> = Partial<TParams> & {
    path?: string
    default?: boolean
    location?: WindowLocation
    navigate?: NavigateFn
    uri?: string
}
