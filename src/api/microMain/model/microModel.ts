export interface JsonList {
  name: string
  json: string
}
export interface editJsonList {
  name?: string
  json?: string
}
export interface JsonListReturn {
  code: number
  msg: string
  data: JsonListData[]
}
export interface JsonListData {
  id: number
  name: string
  json: string
  user_id: number
}
