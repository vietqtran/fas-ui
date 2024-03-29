import axios, { AxiosError } from 'axios'

const instance = axios.create({
   timeout: 300000,
   baseURL: process.env.NEXT_PUBLIC_API_URL
})

instance.interceptors.response.use(
   (response) => {
      return response.data
   },
   (error: AxiosError) => {
      const {data} = error.response?.data
      console.log(data);
      
     return data;
   }
)

export default instance
