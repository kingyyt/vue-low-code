import Http from '@/utils/http/http'
import type {
  AccountLogin,
  AccountLoginResponse,
  AccountRegisterResponse
} from '@/api/account/model/accountModel'

enum Api {
  ACCOUNT_LOGIN = '/api/login/',
  ACCOUNT_REGISTER = '/api/register/'
}

export const ApiLogin = (params: AccountLogin) =>
  Http.post<AccountLoginResponse>(Api.ACCOUNT_LOGIN, params)

export const ApiRegister = (params: AccountLogin) =>
  Http.post<AccountRegisterResponse>(Api.ACCOUNT_REGISTER, params)
