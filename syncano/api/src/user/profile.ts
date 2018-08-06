import * as S from '@eyedea/syncano'
import {MODELS} from '../constants'

class Endpoint extends S.Endpoint {
  async run(
    {users, response}: S.Core
  ) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    return users.fields(MODELS.user).first()
  }
}

export default ctx => new Endpoint(ctx)
