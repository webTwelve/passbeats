import { request } from '@/service/index'
import type { RootObject } from '@/api/type'
import type { ILoginParams, ILoginRes } from './type'
enum ELogin {
  login = '/login'
}

export const Login = (params: ILoginParams) => {
  return request.post<RootObject<ILoginRes>>({
    url: ELogin.login,
    data: params
  })
}
