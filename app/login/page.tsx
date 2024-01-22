'use client'

import React from 'react'
import { useLogin } from '@/hooks/Login'

interface Props {}

const LoginPage = (props: Props) => {
   const { loginHandle, email, setEmail } = useLogin()

   return (
      <div>
         <div>
            <input
               type='text'
               className='text-black'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <button
               onClick={() => {
                  loginHandle()
               }}
            >
               {' '}
               CLick me
            </button>
         </div>
      </div>
   )
}

export default LoginPage
