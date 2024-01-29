'use client'

import { Bounce, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import {
   addStudent,
   deleteStudentById,
   getAllStudents,
   getStudentById,
   updateStudent
} from '@/helpers/api/student'

type Props = {}

const useStudent = () => {
   const [students, setStudents] = useState([])

   const [id, setId] = useState('')
   const [firstName, setFirstName] = useState('')
   const [middleName, setMiddleName] = useState('')
   const [lastName, setLastName] = useState('')
   const [birthDay, setBirthDay] = useState('')
   const [phone, setPhone] = useState('')
   const [majorId, setMajorId] = useState('')
   const [email, setEmail] = useState('')
   const [studentCode, setStudentCode] = useState('')
   const [username, setUsername] = useState('')
   const [address, setAddress] = useState('')
   const [profileImage, setProfileImage] = useState('')

   const [student, setStudent] = useState({})

   useEffect(() => {
      fetchStudents()
   }, [])

   const fetchStudents = async () => {
      const response = (await getAllStudents().then(
         (res) => res
      )) as BaseResponse
      if (response && response?.code === 'SUCCESS') {
         setStudents(response.data)
      } else {
         toast.error('Fetch students failed')
      }
   }

   const deleteStudent = async (id: string) => {
      const response = (await deleteStudentById(id).then(
         (res) => res
      )) as BaseResponse
      if (response && response?.code === 'SUCCESS') {
         toast.success(response?.message)
         fetchStudents()
      } else {
         toast.error('Fetch students failed')
      }
   }

   const createStudent = async (e) => {
      e.preventDefault()
      const response = (await addStudent({
         firstName,
         middleName,
         lastName,
         birthDay,
         phone,
         majorId,
         email,
         studentCode,
         username,
         address,
         profileImage
      } as Student).then((res) => res)) as BaseResponse

      if (response && response?.code === 'SUCCESS') {
         toast.success(response?.message)
         await fetchStudents()
      } else {
         toast.error('Add students failed')
      }
   }

   const getStudent = async (id: string) => {
      const response = (await getStudentById(id).then(
         (res) => res
      )) as BaseResponse
      if (response && response?.code === 'SUCCESS') {
         toast.success(response?.message)
         return response.data
      } else {
         toast.error(response?.message)
      }
   }

   const handleUpdateStudent = async (e) => {
      e.preventDefault()
      const response = (await updateStudent(id, {
         firstName,
         middleName,
         lastName,
         birthDay,
         phone,
         majorId,
         email,
         studentCode,
         username,
         address,
         profileImage
      } as Student).then((res) => res)) as BaseResponse

      if (response && response?.code === 'SUCCESS') {
         toast.success(response?.message)
         await fetchStudents()
      } else {
         toast.error('update students failed')
      }
   }

   return {
      students,
      setStudents,
      deleteStudent,
      firstName,
      setFirstName,
      middleName,
      setMiddleName,
      lastName,
      setLastName,
      birthDay,
      setBirthDay,
      phone,
      setPhone,
      majorId,
      setMajorId,
      email,
      setEmail,
      studentCode,
      setStudentCode,
      username,
      setUsername,
      address,
      setAddress,
      profileImage,
      setProfileImage,
      createStudent,
      fetchStudents,
      getStudent,
      student,
      setId,
      handleUpdateStudent,
      id
   }
}

export default useStudent
