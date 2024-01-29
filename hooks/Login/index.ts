import { Bounce, toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { use, useEffect, useState } from 'react'

import { auth } from '@/helpers/firebase'
import { getAllCampuses } from '@/helpers/api/campus'
import { getAllRoles } from '@/helpers/api/role'
import { login } from '@/helpers/api/login'

export const useLogin = () => {
   const [roles, setRoles] = useState([])
   const [campuses, setCampuses] = useState([])

   const [campusId, setCampusId] = useState('')
   const [roleId, setRoleId] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   useEffect(() => {
      const fetchRoles = async () => {
         const response = await getAllRoles().then((res) => res)

         if (response) {
            setRoles(response.data)
         } else {
            toast.error('Fetch roles failed')
         }
      }

      fetchRoles()
   }, [])

   useEffect(() => {
      const fetchCampuses = async () => {
         const response = await getAllCampuses().then((res) => res)

         if (response) {
            setCampuses(response.data)
         } else {
            toast.error('Fetch campuses failed')
         }
      }

      fetchCampuses()
   }, [])

   const loginHandle = async (e) => {
      e.preventDefault()

      if (!campusId || !roleId || !email || !password) {
         toast.error('Please fill all fields')
         return
      }

      const loginResponse = await login({
         campusId,
         roleId,
         email,
         password
      } as LoginCredentials).then((res) => res)

      if (!loginResponse) {
         toast.error('Login failed')
      } else {
         console.log(loginResponse)
      }
   }

   const loginWithGoogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
         .then((result) => {
            const email = result.user.email
            toast.info(email)
         })
         .catch((error) => {
            toast.error(error.message)
         })
   }

   console.log(roles)
   console.log(campuses)

   return {
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
   }
}
