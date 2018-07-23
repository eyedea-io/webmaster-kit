import {types} from 'mobx-state-tree'

export const CustomDate = types.custom<string | number, Date>({
  name: 'CustomDate',
  fromSnapshot(value: string | number): Date {
    return new Date(value.toString())
  },
  toSnapshot(value: Date): string {
    return value.toISOString()
  },
  isTargetType(value: string | number | Date): boolean {
    return value instanceof Date
  },
  getValidationMessage(value: string): string {
    return !isNaN(Date.parse(value)) ? '' : `${value} doesn't look like a date`
  },
})
