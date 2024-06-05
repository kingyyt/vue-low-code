export interface list {
  name: string
  id: string
  comName?: Record<string, any>
  props?: Record<string, any>
  dataComponents?: Record<string, any>
}

export interface inputComponentProps {
  defaultValue: string
  addonBefore: string
  placeholder?: string
  style?: Object
}
