import Server from '@syncano/core'
import {MODELS} from '../constants'

export default async (ctx) => {
  const {users, response, logger} = new Server(ctx)
  const {info, warn} = logger('api:user/profile')

  if (ctx.meta.user === undefined) {
    warn('Unauthorized.')

    return response.json({message: 'Unauthorized.'}, 401)
  }

  const user = await users.fields(MODELS.user).find(ctx.meta.user.id)

  info('User profile was found.', user)

  response.json(user)
}
