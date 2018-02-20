import Server from '@syncano/core'

export default async (ctx) => {
  const {users, response, logger} = new Server(ctx)
  const {debug} = logger('api:profile')
  const {user} = ctx.meta

  if (user === undefined) {
    response.fail({
      message: 'User profile was not found.'
    })
  } else {
    delete user.user_key

    response.json(user)
  }
}
