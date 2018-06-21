// tslint:disable-next-line:no-var-requires
const Syncano = require('@syncano/core')
import {SyncanoContext, User} from './typings/syncano-context'
import {Logger, SyncanoCore} from './typings/syncano-core'
export {SyncanoCore as ICore}
export {SyncanoContext as IContext}

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

  public run?(core: SyncanoCore, ctx: SyncanoContext): any

  public endpointDidCatch(err: Error) {
    console.warn(err)
  }

  private async execute() {
    try {
      if (typeof this.run === 'function') {
        const res = await this.run(this.syncano, this.ctx)

        if (res !== null && typeof res === 'object') {
          this.syncano.response.json(res)
        }
      } else {
        this.syncano.response.json({
          message: 'No `run` method found on the returned endpoint instance: you may have forgotten to define `run`.',
        })
      }
    } catch (err) {
      this.endpointDidCatch(err)
    }
  }
}
