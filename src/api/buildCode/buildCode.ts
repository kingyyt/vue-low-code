import Http from '@/utils/http/http'
import type { buildCode, downBuildCode } from '@/api/buildCode/model/buildCode'

enum Api {
  BUILDCODE = '/api/buildCode/',
  DOWNUNIAPPZIP = 'api/downUniappZip/'
}

export const buildCodeApi = (params: buildCode, config: any) =>
  Http.post<any>(Api.BUILDCODE, params, config)
export const downbuildCodeApi = (params: downBuildCode) =>
  Http.dowmloadPost<any>(Api.DOWNUNIAPPZIP, params)
