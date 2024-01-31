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
      <Provider store={store}>
         <div className='bg-white text-black h-[100vh] w-[100vw] grid place-items-center'>
            <div className='w-[600px]'>
               <div className='w-full h-[50px] mb-5'>
                  <Image
                     src='/images/logo/FPT_University.png'
                     alt='logo'
                     width={200}
                     height={200}
                     className='w-full h-full object-contain'
                  />
               </div>
               <form onSubmit={checkEmail} className='sm:px-0 px-3'>
                  <div className='border-[1px] flex flex-col gap-5 p-5 rounded-md'>
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
                        className='text-right text-red-300 hover:cursor-pointer  hover:text-red-600 '
                     >
                        Back To Login Page
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </Provider>
   )
}

export default page
