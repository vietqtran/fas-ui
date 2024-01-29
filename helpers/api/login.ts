import instance from '@/helpers/api/_axios_instance'

const END_POINT = {
   LOGIN: 'account/signin',
   LOGIN_WITH_GOOGLE: 'account/signin/google'
}

export const login = (loginData: LoginCredentials) => {
   return instance.post(`/${END_POINT.LOGIN}`, loginData)
}

export const loginWithGoogleAPI = (loginData: LoginWithGoogleCredentials) => {
   return instance.post(`/${END_POINT.LOGIN_WITH_GOOGLE}`, loginData)
}
