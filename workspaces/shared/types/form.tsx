import {MessageBag} from '@shared/types/message-bag'
import {getRoot, types} from 'mobx-state-tree'

const Field = {
  name: types.string,
  placeholder: types.maybe(types.string),
  value: types.frozen(),
}

export const Form = types
  .model('Form', {
    name: types.string,
    fields: types.optional(types.map(types.frozen(Field)), {}),
    originalFields: types.optional(types.map(types.frozen(Field)), {}),
    errors: types.optional(MessageBag, {}),
  })
  .views(self => ({
    value(name: string, defaultValue: any = ''): any {
      return self.fields.get(name).value || defaultValue
    },
    get data(): any  {
      return Array.from(self.fields.entries())
        .reduce((all, [name, attrs]) => {
          return {
            ...all,
            [name]: attrs.value,
          }
        }, {})
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.originalFields.replace(self.fields)
    },
    handleChange(event: React.FormEvent<HTMLInputElement> | string, value?: any) {
      const name = typeof event === 'string' ? event : event.currentTarget.name
      const val = typeof event === 'string' ? value : event.currentTarget.value

      self.fields.set(name, {
        ...self.fields.get(name),
        value: val || '',
      })
    },
  }))
  .actions(self => ({
    clear() {
      self.fields.replace(self.originalFields)
    },
    field(name: string): any {
      const {t} = getRoot<any>(self)
      const {placeholder} = self.fields.get(name)

      return {
        ...self.fields.get(name),
        name,
        id: name,
        onChange: self.handleChange,
        placeholder: t ? t`${placeholder}` : placeholder,
      }
    },
  }))

type FormType = typeof Form.Type
export interface Form extends FormType {}
