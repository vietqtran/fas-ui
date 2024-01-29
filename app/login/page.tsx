'use client'

import {
   Button,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField
} from '@mui/material'

import Image from 'next/image'
import React from 'react'
import { useLogin } from '@/hooks/Login'

interface Props { }

const LoginPage = (props: Props) => {
   const {
      roles,
      campuses,
      loginHandle,
      loginWithGoogle,
      campusId,
      setCampusId,
      roleId,
      setRoleId,
      email,
      setEmail,
      password,
      setPassword
   } = useLogin()

   const forgetPassword = () => {
      window.location.href = "/login/forgot-password";
   }

   return (
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
            <form action='#' onSubmit={loginHandle} className='sm:px-0 px-3'>
               <div className='border-[1px] flex flex-col gap-5 p-5 rounded-md'>
                  <div className='grid grid-cols-2 gap-5'>
                     <FormControl fullWidth>
                        <InputLabel id='role-label'>Role</InputLabel>
                        <Select
                           labelId='role-label'
                           id='role-select'
                           value={roleId}
                           label='Role'
                           onChange={(e) => setRoleId(e.target.value)}
                        >
                           {roles?.map((role) => (
                              <MenuItem key={role.id} value={role.id}>
                                 {role.name}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                     <FormControl fullWidth>
                        <InputLabel id='campus-label'>Campus</InputLabel>
                        <Select
                           labelId='campus-label'
                           id='campus-select'
                           value={campusId}
                           label='Campus'
                           onChange={(e) => setCampusId(e.target.value)}
                        >
                           {campuses?.map((campus) => (
                              <MenuItem key={campus.id} value={campus.id}>
                                 {campus.location}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </div>
                  <TextField
                     id='email-input'
                     label='Email'
                     variant='outlined'
                     type='email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                     id='pass-input'
                     label='Password'
                     variant='outlined'
                     type='password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     autoComplete='on'
                  />

                  <Button
                     type='submit'
                     className='py-3 hover:bg-blue-500 hover:text-white'
                     variant='outlined'
                  >
                     Login
                  </Button>
               </div>
            </form>
            <div className='flex items-center gap-3 my-5'>
               <hr className='block flex-1' />
               <span className='text-sm opacity-50'>OR</span>
               <hr className='block flex-1' />
            </div>
            <div className='w-full'>
               <Button
                  onClick={loginWithGoogle}
                  variant='outlined'
                  className='w-full  py-3 text-center '
               >
                  <svg
                     width='24'
                     height='24'
                     viewBox='0 0 24 24'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        d='M6.98916 13.8775L6.36261 16.2165L4.07258 16.2649C3.38819 14.9956 3 13.5432 3 11.9999C3 10.5075 3.36295 9.10009 4.00631 7.86087H4.0068L6.04557 8.23465L6.93868 10.2612C6.75175 10.8061 6.64987 11.3911 6.64987 11.9999C6.64994 12.6605 6.76961 13.2935 6.98916 13.8775Z'
                        fill='#FBBB00'
                     />
                     <path
                        d='M20.8431 10.3184C20.9465 10.8628 21.0003 11.425 21.0003 11.9997C21.0003 12.644 20.9326 13.2725 20.8035 13.8788C20.3654 15.9419 19.2206 17.7433 17.6348 19.0182L17.6343 19.0177L15.0663 18.8866L14.7029 16.6178C15.7552 16.0007 16.5776 15.0349 17.0108 13.8788H12.1982V10.3184H17.081H20.8431Z'
                        fill='#518EF8'
                     />
                     <path
                        d='M17.6335 19.0183L17.634 19.0188C16.0917 20.2585 14.1324 21.0002 11.9996 21.0002C8.57225 21.0002 5.59238 19.0845 4.07227 16.2654L6.98885 13.8779C7.74889 15.9064 9.70564 17.3503 11.9996 17.3503C12.9857 17.3503 13.9094 17.0838 14.7021 16.6185L17.6335 19.0183Z'
                        fill='#28B446'
                     />
                     <path
                        d='M17.7442 5.07196L14.8286 7.45892C14.0082 6.94613 13.0384 6.64991 11.9995 6.64991C9.65358 6.64991 7.66023 8.16011 6.93826 10.2613L4.00635 7.86096H4.00586C5.50372 4.97307 8.52117 3 11.9995 3C14.1832 3 16.1855 3.77786 17.7442 5.07196Z'
                        fill='#F14336'
                     />
                  </svg>
                  <span className='ml-3'>Login with Google</span>
               </Button>

               <Button
                  onClick={forgetPassword}
                  variant='outlined'
                  className='w-full hover:bg-rose-100  py-3 text-center mt-4 border-2 border-rose-300 '
               >
                  <span className='ml-3 text-red-400'>Forget Password?</span>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default LoginPage
