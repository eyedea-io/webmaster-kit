import {Form, IForm} from '@shared/types/form'
import {types} from 'mobx-state-tree'

export const FormStore = types
  .model('FormStore', {
    forms: types.optional(types.array(Form), []),
  })
  .actions(self => ({
    add(name: string, fields: any) {
      // Don't add form if already exists
      let form = self.forms.find(item => item.name === name)

      if (form) {
        return form
      }

      form = Form.create({name, fields})
      form.clear()

      self.forms.push(form)

      return form
    },

    get(name: string): IForm {
      return self.forms.find(form => form.name === name)
    },
  }))

export type IFormStore = typeof FormStore.Type
