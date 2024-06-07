import Http from '@/utils/http/http'
import type {
  JsonList,
  editJsonList,
  JsonListReturn,
  JsonListData
} from '@/api/microMain/model/microModel'

enum Api {
  MICROMAIN_JSONLIST = '/api/jsonList/',
  MICROMAIN_JSONLISTDETAIL = '/api/jsonListDetail/'
}

export const GetJsonList = () => Http.get<JsonListReturn>(Api.MICROMAIN_JSONLIST)

export const PostJsonList = (params: JsonList) =>
  Http.post<JsonListData>(Api.MICROMAIN_JSONLIST, params)

export const GetJsonListDetail = (id: number) =>
  Http.get<JsonListData>(`${Api.MICROMAIN_JSONLISTDETAIL}${id}/`)

export const PatchJsonListDetail = (params: editJsonList, id: number) =>
  Http.patch<JsonListData>(`${Api.MICROMAIN_JSONLISTDETAIL}${id}/`, params)

export const DeleteJsonListDetail = (id: number) =>
  Http.delete<JsonListData>(`${Api.MICROMAIN_JSONLISTDETAIL}${id}/`)
