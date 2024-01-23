import instance from '@/helpers/api/_axios_instance'

const END_POINT = {
   LOGIN: 'signin'
}

export const login = (loginData: LoginCredentials) => {
   return instance.post(`/${END_POINT.LOGIN}`, loginData)
}
