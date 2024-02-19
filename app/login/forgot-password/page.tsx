'use client'

import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography
} from '@mui/material'

import Image from 'next/image'
import Link from 'next/link'
import { Provider } from 'react-redux'
import React from 'react'
import { store } from '@/helpers/redux/store'
import { useLogin } from '@/hooks/Login'

type Props = {}

const bull = (
   <Box
      component='span'
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
   >
      •
   </Box>
)

const page = (props: Props) => {
   const { email, setEmail, checkEmail } = useLogin()
   return (
      <div className='grid h-[100vh] w-[100vw] place-items-center bg-white text-black'>
         <div className='w-[600px]'>
            <div className='mb-5 h-[50px] w-full'>
               <Image
                  src='/images/logo/FPT_University.png'
                  alt='logo'
                  width={200}
                  height={200}
                  className='h-full w-full object-contain'
               />
            </div>
            <form onSubmit={checkEmail} className='px-3 sm:px-0'>
               <div className='flex flex-col gap-5 rounded-md border-[1px] p-5'>
                  <TextField
                     id='email-input'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     label='Email'
                     variant='outlined'
                     type='email'
                  />
                  <Button
                     type='submit'
                     className='py-3 hover:bg-blue-500 hover:text-white'
                     variant='outlined'
                  >
                     Send Email
                  </Button>

                  <Link
                     href={'/login'}
                     className='text-right text-red-300 hover:cursor-pointer hover:text-red-600'
                  >
                     Back To Login Page
                  </Link>
               </div>
            </form>
         </div>
      </div>
   )
}

export default page
