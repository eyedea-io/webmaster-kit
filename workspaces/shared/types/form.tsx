import {MessageBag} from '@shared/types/message-bag'
import {getRoot, types} from 'mobx-state-tree'

export const Form = types
  .model('Form', {
    name: types.string,
    fields: types.frozen(),
    originalFields: types.optional(types.frozen(), {}),
    errors: types.optional(MessageBag, {}),
  })
  .views(self => ({
    get data(): any  {
      return Object
        .keys(self.fields)
        .reduce((all, fieldName) => ({
          ...all,
          [fieldName]: self.fields[fieldName].value,
        }), {})
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.originalFields = self.fields
    },
    handleChange(event: React.FormEvent<HTMLInputElement> | string, value?: any) {
      const name = typeof event === 'string' ? event : event.currentTarget.name
      const val = typeof event === 'string' ? value : event.currentTarget.value

      self.fields = {
        ...self.fields,
        [name]: {
          ...self.fields[name],
          value: val || '',
        },
      }
    },
  }))
  .actions(self => ({
    clear() {
      self.fields = Object.keys(self.fields).reduce((all, name) => ({
        ...all,
        [name]: {
          ...self.fields[name],
          value: self.originalFields[name].value || '',
        },
      }), {})
    },
    editable(name: string) {
      return {
        ...self.fields[name],
        placeholder: getRoot(self).t`${self.fields[name].placeholder}`,
        name,
        id: name,
        onChange: self.handleChange,
      }
    },
  }))

type FormType = typeof Form.Type
export interface Form extends FormType {}
