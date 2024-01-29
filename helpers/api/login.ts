import instance from '@/helpers/api/_axios_instance'

const END_POINT = {
   LOGIN: 'account/signin',
   LOGIN_WITH_GOOGLE: 'signin/google'
}

export const login = (loginData: LoginCredentials) => {
   return instance.post(`/${END_POINT.LOGIN}`, loginData)
}

export const loginWithGoogle = (email: string) => {
   return instance.post(`/${END_POINT.LOGIN_WITH_GOOGLE}`, email)
}
