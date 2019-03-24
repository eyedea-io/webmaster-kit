import {NavigateFn, WindowLocation} from '@reach/router'

export type WithParams<TParams = {}> = Partial<TParams> & {
  path?: string
  default?: boolean
  location?: WindowLocation
  navigate?: NavigateFn
  uri?: string
}
