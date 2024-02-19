import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Link from 'next/link'
import { RootState } from '@/helpers/redux/reducers'
import { removeUser } from '@/helpers/redux/actions/user'
import { useRouter } from 'next/navigation'
import useStudent from '@/hooks/Student'

interface Props {}

const Header = (props: Props) => {
   const { user } = useSelector((state: RootState) => state.user)

   const { fetchStudentByEmail } = useStudent()

   let [userName, setUserName] = useState()
   let [campus, setCampus] = useState()

   useEffect(() => {
      handleGetStudent(user?.email ?? '')
   }, [])

   const handleGetStudent = async (email) => {
      let data = await fetchStudentByEmail(email)
      setUserName(data?.username)
      setCampus(data?.campus?.name)
   }

   const dispatch = useDispatch()
   const router = useRouter()

   return (
      <>
         <div className='my-[10px] w-full'>
            <h1 className='text-3xl text-black'>FPT Attendance System</h1>
         </div>
         <div className='flex w-full justify-between bg-gray-50 p-3'>
            <Link href='/' className='text-blue-400'>
               Home
            </Link>
            <div className='flex items-center justify-end gap-3'>
               <Link
                  href={'/viewProfile'}
                  className='block cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline'
               >
                  {userName}
               </Link>
               <div
                  onClick={() => {
                     dispatch(removeUser())
                     router.push('/login')
                  }}
                  className='cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline'
               >
                  logout
               </div>
               <div className='cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline'>
                  Campus: {campus}
               </div>
            </div>
         </div>
      </>
   )
}

export default Header
