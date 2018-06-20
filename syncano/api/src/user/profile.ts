import {MODELS} from '../constants'
import * as Syncano from '../syncano'

class UserProfile extends Syncano.Endpoint {
  async run() {
    if (this.user === undefined) {
      throw new Syncano.respondWith.Unauthorized()
    }

    return this.syncano.users.fields(MODELS.user).first()
  }
}

export default ctx => new UserProfile(ctx)
