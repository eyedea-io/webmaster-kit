import {APP_LANG} from '@shared/config'
import * as translations from '@shared/lang'
import {types} from 'mobx-state-tree'

export const LangStore = types
  .model({
    language: types.optional(types.string, APP_LANG),
  })
  .actions(self => ({
    setLanguage(value: string) {
      self.language = value
    },
  }))
  .views(self => ({
    t(key: any, ...expressions: any[]) {
      const language = self.language

      const value = key.reduce(
        (accumulator, part, i) => accumulator + expressions[i - 1] + part
      )
      const id = Array.isArray(value) ? value[0] : value

      if (language) {
        return translations[language][id] || id
      }

      return translations[APP_LANG][id] || translations.EN[id] || id
    },
  }))

type LangStoreType = typeof LangStore.Type
export interface LangStore extends LangStoreType {}
