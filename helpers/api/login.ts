import instance from '@/helpers/api/_axios_instance'

const END_POINT = {
   LOGIN: 'account/signin',
   LOGIN_WITH_GOOGLE: 'account/signin/google',
   FORGOT_PASSWORD: 'account/signin/forgotpassword',
}

export const login = (loginData: LoginCredentials) => {
   return instance.post(`/${END_POINT.LOGIN}`, loginData)
}

export const loginWithGoogleAPI = (loginData: LoginWithGoogleCredentials) => {
   return instance.post(`/${END_POINT.LOGIN_WITH_GOOGLE}`, loginData)
}

export const forgotPassword = (email: string) => {
   return instance.get(`/${END_POINT.FORGOT_PASSWORD}`, { params: { email: email } })
}