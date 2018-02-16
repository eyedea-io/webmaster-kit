import {types} from 'mobx-state-tree'
import {MessageBag} from './message-bag'

export const Form = types
  .model('Form', {
    name: types.string,
    fields: types.frozen,
    errors: types.optional(MessageBag, {}),
  })
  .views(self => ({
    get data(): any  {
      return Object
        .keys(self.fields)
        .reduce((all, fieldName) => ({
          ...all,
          [fieldName]: self.fields[fieldName].value
        }), {})
    }
  }))
  .actions(self => ({
    handleChange(event: React.FormEvent<HTMLInputElement>) {
      self.fields = Object.assign({}, self.fields, {
        [event.currentTarget.name]: {
          ...self.fields[event.currentTarget.name],
          value: event.currentTarget.value
        }
      })

      self.fields = {
        ...self.fields,
        [event.currentTarget.name]: {
          ...self.fields[event.currentTarget.name],
          value: event.currentTarget.value
        }
      }
    }
  }))
  .actions(self => ({
    clear() {
      self.fields = Object.keys(self.fields).reduce((all, name) => ({
        ...all,
        [name]: {
          ...self.fields[name],
          value: self.fields[name].value || ''
        }
      }), {})
    },
    editable(name: string) {
      return {
        ...self.fields[name],
        name,
        id: name,
        onChange: self.handleChange,
      }
    }
  }))

export const FormStore = types
  .model('FormStore', {
    forms: types.optional(types.array(Form), [])
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
    }
  }))

export type IForm = typeof Form.Type
export type IFormStore = typeof FormStore.Type
