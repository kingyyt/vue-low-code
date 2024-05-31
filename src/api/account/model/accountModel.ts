export interface AccountLogin {
  username: string
  password: string
}

export interface AccountLoginResponse {
  code: number
  token: string
}

export interface AccountRegisterResponse {
  code: number
  success: string
}
