import Http from '@/utils/http/http'
import type { buildCode } from '@/api/buildCode/model/buildCode'

enum Api {
  BUILDCODE = '/api/buildCode/'
}

export const buildCodeApi = (params: buildCode) => Http.get<any>(Api.BUILDCODE, params)
