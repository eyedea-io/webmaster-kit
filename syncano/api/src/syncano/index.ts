// tslint:disable-next-line:no-var-requires
const Syncano = require('@syncano/core')
import {SyncanoContext, User} from './typings/syncano-context'
import {Logger} from './typings/syncano-core'

export class Endpoint {
  public ctx: SyncanoContext
  public user?: User
  public logger: Logger
  public syncano: any

  constructor(ctx: SyncanoContext) {
    this.ctx = ctx
    this.user = ctx.meta.user
    this.syncano = new Syncano(ctx)
    this.logger = this.syncano.logger(this.ctx.meta.executor)
    this.execute()
  }

  public run?(): any

  public endpointDidCatch(err: Error) {
    console.warn(err)
  }

  private async execute() {
    try {
      if (typeof this.run === 'function') {
        const res = await this.run()

        if (res !== undefined) {
          this.syncano.response.json(res)
        }
      } else {
        throw new Error(
          'No `run` method found on the returned endpoint instance: you may have forgotten to define `run`.'
        )
      }
    } catch (err) {
      if (err instanceof HttpResponse) {
        this.syncano.response.json({
          message: err.message || err.name,
        }, err.status)
      } else {
        this.endpointDidCatch(err)
      }
    }
  }
}

class HttpResponse extends Error {
  status: number
}

export const respondWith = {
  BadRequest: class extends HttpResponse {
    constructor(message?: any) {
      super(message)
      this.status = 400
      this.name = 'BadRequest'
    }
  },
  Unauthorized: class extends HttpResponse {
    constructor(message?: any) {
      super(message)
      this.status = 401
      this.name = 'Unauthorized'
    }
  },
  Forbidden: class extends HttpResponse {
    constructor(message?: any) {
      super(message)
      this.status = 403
      this.name = 'Forbidden'
    }
  },
  NotFound: class extends HttpResponse {
    constructor(message?: any) {
      super(message)
      this.status = 404
      this.name = 'NotFound'
    }
  },
  MethodNotAllowed: class extends HttpResponse {
    constructor(message?: any) {
      super(message)
      this.status = 405
      this.name = 'MethodNotAllowed'
    }
  },
}
