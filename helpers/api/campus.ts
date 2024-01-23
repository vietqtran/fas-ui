import instance from '@/helpers/api/_axios_instance'

const END_POINT = {
   GET_ALL_CAMPUS: 'campus'
}

export const getAllCampuses = () => {
   return instance.get(`/${END_POINT.GET_ALL_CAMPUS}`)
}
