import {MODELS} from '../constants'
import * as Syncano from '../syncano'

class UserProfile extends Syncano.Endpoint {
  async run({users, response}: Syncano.ICore) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    return users.fields(MODELS.user).first()
  }
}

export default ctx => new UserProfile(ctx)
