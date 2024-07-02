export interface list {
  name: string
  id: string
  comName?: Record<string, any>
  props?: Record<string, any>
  dataComponents?: Record<string, any>
  model?: any
}

export interface inputComponentProps {
  addonBefore: string
  placeholder?: string
  style?: Object
  name: string
  rules: Array<any>
  color?: string
}
