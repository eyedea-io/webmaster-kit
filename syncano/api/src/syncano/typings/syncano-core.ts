export interface Logger {
  warn: (...messages: any[]) => void
  debug: (...messages: any[]) => void
  info: (...messages: any[]) => void
  error: (...messages: any[]) => void
  listen: (callback: (event: Object) => void) => void
}

export interface SyncanoCore {
  response: any
  users: any
  data: any
  endpoint: any
  socket: any
  channel: any
  account: any
  _class: any
  event: any
  hosting: any
  instance: any
  logger: any
  registry: any
  trace: any
}
