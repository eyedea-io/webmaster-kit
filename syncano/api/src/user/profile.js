import Server from '@syncano/core'

export default async (ctx) => {
  const {users, response, logger} = new Server(ctx)
  const {warn} = logger('api:user/profile')

  if (ctx.meta.user === undefined) {
    warn('User profile was not found.')
    response.fail({message: 'User profile was not found.'})
  } else {
    info('User profile was found.')

    const user = users.field(MODELS.user).find(ctx.meta.user.id)

    response.json(user)
  }
}
