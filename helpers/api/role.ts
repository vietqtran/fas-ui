import instance from '@/helpers/api/_axios_instance'

const END_POINT = {
   GET_ALL_ROLE: 'role'
}

export const getAllRoles = () => {
   return instance.get(`/${END_POINT.GET_ALL_ROLE}`)
}
