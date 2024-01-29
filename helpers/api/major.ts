import instance from '@/helpers/api/_axios_instance'

const END_POINT = {
   GET_ALL_MAJOR: 'major'
}

export const getAllMajors = () => {
   return instance.get(`/${END_POINT.GET_ALL_MAJOR}`)
}
