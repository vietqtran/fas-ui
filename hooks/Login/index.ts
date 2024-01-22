import { useState } from 'react'

export const useLogin = () => {
   const [campusId, setCampusId] = useState('')
   const [roleId, setRoleId] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const loginHandle = () => {
      console.log(email)
   }

   return {
      loginHandle,
      campusId,
      setCampusId,
      roleId,
      setRoleId,
      email,
      setEmail,
      password,
      setPassword
   }
}
