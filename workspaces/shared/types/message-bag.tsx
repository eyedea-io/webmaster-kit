import {types} from 'mobx-state-tree'

export const MessageBag = types
  .model('MessageBag', {
    messages: types.optional(types.map(types.string), {}),
  })
  .actions(self => ({
    merge(messages: string | object) {
      if (typeof messages === 'string') {
        self.messages.set(messages, '')
      } else {
        self.messages.merge(messages)
      }
    },
  }))
  .actions(self => ({
    add(key: string, message: string) {
      self.messages.set(key, message)
    },
    replace(messages: string | object) {
      self.messages.clear()
      self.merge(messages)
    },
    clear() {
      self.messages.clear()
    },
    remove(key: string) {
      self.messages.delete(key)
    },
  }))
  .views(self => ({
    has(key: string): boolean {
      return self.messages.has(key)
    },
    first(key?: string): string {
      const message = self.messages.get(key)

      if (key === undefined && self.messages.size) {
        const [name, value] = self.messages.entries()[0]

        return value || name
      }

      return Array.isArray(message) ? message[0] : message
    },
    get(key: string): Array<string> {
      const message = self.messages.get(key)

      if (message) {
        return Array.isArray(message) ? message : [message]
      }

      return []
    },
    get all(): Array<string> {
      const result = []

      self.messages.forEach((value, key) => {
        if (value === '') {
          result.push(key)
        } else {
          result[key] = value
        }
      })

      return result
    },
    get count(): number {
      return self.messages.size
    },
    get any(): boolean {
      return Boolean(self.messages.size)
    },
    get isEmpty(): boolean {
      return self.messages.size === 0
    },
  }))

type MessageBagType = typeof MessageBag.Type
export interface MessageBag extends MessageBagType {}
