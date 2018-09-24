import {RouteComponentProps as WithParams} from '@reach/router'
import {Store} from '@website/stores'

interface WithStore {
  store: Store
}

export {WithStore, WithParams}
