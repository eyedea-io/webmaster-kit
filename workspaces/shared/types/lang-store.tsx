import * as translations from '@shared/lang'
import {WORKSPACE_LANG} from '@website/config'
import {Instance, types} from 'mobx-state-tree'

export const LangStore = types
  .model({
    language: types.optional(types.string, WORKSPACE_LANG),
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
        (accumulator: string | number, part: string | number, i: number) => accumulator + expressions[i - 1] + part
      )
      const id = Array.isArray(value) ? value[0] : value

      if (language && translations[language]) {
        return translations[language][id] || id
      }

      return translations[WORKSPACE_LANG][id] || translations.EN[id] || id
    },
  }))

export interface LangStore extends Instance<typeof LangStore> {}
